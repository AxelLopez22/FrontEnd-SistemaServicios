import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteServicesService } from '../../services/cliente-services.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Planes } from '../../models/models';


@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss']
})
export class AddClienteComponent implements OnInit {
  loader = false
  hide = true;
  breakpoint!: number;
  clientesForm!: FormGroup;
  planes: Planes[] = [];
  displayedColumns: string[] = [
    'categoria', 'nombre', 'descripcion', 'precio', 'acciones'
  ];

  constructor(private fb:FormBuilder, private httpService: ClienteServicesService,  private toastr: ToastrService,
    private route: Router){

  }

  ngOnInit(): void {
    //this.ObtenerServicios();
    this.breakpoint = (window.innerWidth <= 600) ? 2 : 6;
    this.clientesForm = this.initForm();
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.email],
      celular: ['', Validators.required],
      inss: ['', Validators.required],
      cedula: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 2 : 6;
  }

  // ObtenerServicios(){
  //   this.httpService.ListarServicio().subscribe((data: any) => {
  //     console.log(data.data);
  //     for(let element of data.data){
  //       this.planes.push(element)
  //     }
  //   });
  // }

  createCliente(){
    this.loader = true;
    this.httpService.addCliente(this.clientesForm.value).subscribe({
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
}
