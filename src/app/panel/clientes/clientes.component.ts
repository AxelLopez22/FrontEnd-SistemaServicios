import { Component, OnInit } from '@angular/core';
import { ClienteServicesService } from '../services/cliente-services.service';
import { Clientes } from '../models/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = [
    'nombres', 'apellidos', 'correo', 'celular', 'inss', 'cedula', 'direccion', 'acciones'
  ];
  clientes: Clientes[] = [];

  constructor(private clienteServices:ClienteServicesService){}

  ngOnInit(): void {
    this.GetClientes();
  }

  GetClientes(){
    this.clienteServices.getClientes().subscribe((data:any) => {
      console.log(data);

      for(let element of data.data){
        this.clientes.push(element);
      }
    });
  }

  showDeleteAlert(idUserDelete: number) {
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      icon: "info",
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cerrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCliente(idUserDelete);
      }
    })
  }

  deleteCliente(id: number){
    this.clienteServices.DeleteCliente(id).subscribe({
      next: (res: any) => {
        Swal.fire(`${res.data}`, '', 'success');
        this.GetClientes();
      },
      error: (err: any) => {
        Swal.fire(`${err.data}`, '', 'error')
      },
    });
  }

  search(value: string){

  }
}
