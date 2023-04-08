import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteServicesService } from '../../services/cliente-services.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {
  loader = false;
  breakpoint!: number;
  clientesEditForm!: FormGroup;
  idCliente!: number;

  constructor(private fb:FormBuilder, private httpService: ClienteServicesService,  private toastr: ToastrService,
    private route: Router, private params: ActivatedRoute){}

  ngOnInit(): void {
    const {id} = this.params.snapshot.params;
    this.idCliente = id;
    this.breakpoint = (window.innerWidth <= 600) ? 2 : 6;
    this.getClienteById();
    this.clientesEditForm = this.initForm();
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

  getClienteById(){
    this.httpService.getClienteId(this.idCliente).subscribe({
      next: (res:any) => {
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
    this.httpService.UpdateCliente(this.idCliente, this.clientesEditForm.value).subscribe({
      next: (res:any) => {
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

}
