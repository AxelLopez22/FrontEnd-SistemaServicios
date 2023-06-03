import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { VerPagosClientes } from '../models/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PagoService } from '../services/pago.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit, AfterViewInit {

  pagosClientes: VerPagosClientes[] = [];

  displayedColumns: string[] = [
    'cliente', 'monto', 'fecha', 'servicio', 'acciones'
  ];

  dataSource = new MatTableDataSource<VerPagosClientes>(this.pagosClientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private httpService: PagoService){}

  ngOnInit(): void {
    this.GetPagosClientes();
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

  GetPagosClientes(){
    this.httpService.listarPagos().subscribe({
      next:(res: any) => {
        this.pagosClientes = res.data;
        this.dataSource.data = this.pagosClientes;
      },
      error:(err: any) => {
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
