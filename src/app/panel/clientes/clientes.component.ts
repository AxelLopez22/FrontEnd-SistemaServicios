import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClienteServicesService } from '../services/cliente-services.service';
import { Clientes } from '../models/models';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  clientes: Clientes[] = [];

  displayedColumns: string[] = [
    'nombres', 'apellidos', 'celular', 'servicio','direccion', 'acciones'
  ];
  dataSource = new MatTableDataSource<Clientes>(this.clientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private clienteServices:ClienteServicesService){}

  ngOnInit(): void {
    this.GetClientes();
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

  GetClientes(){
    this.clienteServices.getClientes().subscribe((data:any) => {
      //console.log(data);

      for(let element of data.data){
        this.clientes.push(element);
      }

      this.dataSource.data = this.clientes;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
