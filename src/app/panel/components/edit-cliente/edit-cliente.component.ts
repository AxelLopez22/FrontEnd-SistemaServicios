import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteServicesService } from '../../services/cliente-services.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCliente, Planes, updateServiceUser } from '../../models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit, AfterViewInit {
  loader = false;
  breakpoint!: number;
  clientesEditForm!: FormGroup;
  idCliente!: number;
  planes: Planes[] = [];
  servicio: updateServiceUser = {
    id: 0,
    nombre: ''
  };
  displayedColumns: string[] = [
    'categoria', 'nombre', 'descripcion', 'precio', 'acciones'
  ];

  dataSource = new MatTableDataSource<Planes>(this.planes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb:FormBuilder, private httpService: ClienteServicesService,  private toastr: ToastrService,
    private route: Router, private params: ActivatedRoute, private http: ServicesService){}

  ngOnInit(): void {
    this.ObtenerServicios();
    const {id} = this.params.snapshot.params;
    this.idCliente = id;
    this.breakpoint = (window.innerWidth <= 600) ? 2 : 6;
    this.getClienteById();
    this.clientesEditForm = this.initForm();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator  = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina:';
    this.paginator._intl.nextPageLabel = 'Pagina siguiente';
    this.paginator._intl.previousPageLabel = 'Pagina anterior';
    this.paginator._intl.firstPageLabel = 'Primera pagina';
    this.paginator._intl.lastPageLabel = 'Ultima pagina';
  }

  ObtenerServicios(){
    this.http.ListarServicio().subscribe({
      next:(res:any) => {
        this.dataSource.data = res.data;
      },
      error:(err:any) => {
        console.log(err);
      },
    });
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.email],
      celular: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 2 : 6;
  }

  elegirServicio(plan: Planes){
    this.servicio = {
      id: plan.id,
      nombre: plan.nombre
    }
  }

  getClienteById(){
    this.httpService.getClienteId(this.idCliente).subscribe({
      next: (res:any) => {
        console.log(res);

        this.clientesEditForm.get('nombres')?.setValue(res.data.nombres);
        this.clientesEditForm.get('apellidos')?.setValue(res.data.apellidos);
        this.clientesEditForm.get('direccion')?.setValue(res.data.direccion);
        this.clientesEditForm.get('correo')?.setValue(res.data.correo);
        this.clientesEditForm.get('celular')?.setValue(res.data.celular);
      },
      error: (err: any) => {
        console.log(err);
      }
    });

  }

  UpdateCliente(){
    this.loader = true;

    let usuario: EditCliente = {
      nombres: this.clientesEditForm.get('nombres')?.value,
      apellidos: this.clientesEditForm.get('apellidos')?.value,
      celular: this.clientesEditForm.get('celular')?.value,
      correo: this.clientesEditForm.get('correo')?.value,
      direccion: this.clientesEditForm.get('direccion')?.value,
      idServicio: this.servicio.id
    }

    console.log(usuario);

    this.httpService.UpdateCliente(this.idCliente, usuario).subscribe({
      next: (res:any) => {
        console.log(res);
        this.showAlert(res.status, res.data);
        setTimeout(() => {
          this.loader = false;
          this.route.navigate(['admin/panel/clientes']);
        }, 1000);
      },
      error: (err:any) => {
        const {status, data} = err.error;
        this.showAlert(status, data)
        setTimeout(() => {
          this.loader = false;
        }, 1000);
      },
    });
  }

  showAlert(status: string, mensaje: string) {
    status === "Ok" ? this.toastr.success(`${mensaje}`, "", {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      easing: 'ease-in',
      easeTime: 300
    }) : this.toastr.error(`${mensaje}`, "", {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      easing: 'ease-in',
      easeTime: 300
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
