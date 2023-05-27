import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Servicio } from '../models/models';
import { ServicesService } from '../services/services.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit, AfterViewInit {

  service: Servicio[] = []

  displayedColumns: string[] = [
    'categoria', 'nombre', 'descripcion', 'precio', 'acciones'
  ];

  dataSource = new MatTableDataSource<Servicio>(this.service);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private listar: ServicesService){}

  ngOnInit(): void {
    this.ListarServicio();
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

  search(value: string){

  }

  ListarServicio(){
    this.listar.ListarServicio().subscribe({
      next:(res: any) => {
        for(let element of res.data){
          this.service.push(element);
        }
        this.dataSource.data = this.service;
      },error:(err:any) => {
          console.log('Error ' + err);
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



