import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteServicesService } from '../../services/cliente-services.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CreateCliente, Planes } from '../../models/models';
import { ServicesService } from '../../services/services.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss']
})
export class AddClienteComponent implements OnInit, AfterViewInit {
  isLinear = false;
  loader = false
  hide = true;
  breakpoint!: number;
  clientesForm!: FormGroup;
  planesForm!: FormGroup;
  planes: Planes[] = [];
  servicio: any = '';
  displayedColumns: string[] = [
    'categoria', 'nombre', 'descripcion', 'precio', 'acciones'
  ];

  dataSource = new MatTableDataSource<Planes>(this.planes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb:FormBuilder, private httpService: ClienteServicesService,  private toastr: ToastrService,
    private route: Router, private http: ServicesService, private datePipe: DatePipe){
      this.planes = [];
  }

  ngOnInit(): void {
    this.ObtenerServicios();
    this.breakpoint = (window.innerWidth <= 600) ? 2 : 6;
    this.clientesForm = this.initForm();
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

  initForm(): FormGroup{
    return this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.email],
      celular: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      inss: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{6}-\d{4}[A-Za-z]$/)]],
      direccion: ['', Validators.required]
    });
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 2 : 6;
  }

  limitarDigitos(event: any) {
    const valorActual: string = event.target.value;
    const longitudMaxima = 8;
    if (valorActual.length > longitudMaxima) {
      event.target.value = valorActual.slice(0, longitudMaxima);
    }
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

  elegirServicio(plan: Planes){
    this.dataSource.data.forEach((item) => {
      item.avialable = false
    });

    plan.avialable = true;
    this.servicio = {
      id: plan.id,
      nombre: plan.nombre
    }
  }

  createCliente(){
    let cliente: CreateCliente = {
      nombres: this.clientesForm.get('nombres')?.value,
      apellidos: this.clientesForm.get('apellidos')?.value,
      correo: this.clientesForm.get('correo')?.value,
      celular: this.clientesForm.get('celular')?.value,
      inss: this.clientesForm.get('inss')?.value,
      cedula: this.clientesForm.get('cedula')?.value,
      direccion: this.clientesForm.get('direccion')?.value,
      idPlan: this.servicio.id
    }

    this.loader = true;
    this.httpService.addCliente(cliente).subscribe({
      next:(res:any) => {
        this.showAlert(res.status, res.data);
        setTimeout(() => {
          this.loader = false;
          this.route.navigate(['admin/panel/clientes']);
        }, 1000);
      },
      error:(err:any) => {
        const {status, data} = err.error;
        this.showAlert(status, data)
        setTimeout(() => {
          this.loader = false;
        }, 1000);
      },
    })
  }

  showAlert(status: string, mensaje: string){
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
