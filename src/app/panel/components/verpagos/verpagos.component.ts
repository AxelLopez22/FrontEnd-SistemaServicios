import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { ActivatedRoute } from '@angular/router';
import { HistorialPagosClientes } from '../../models/models';

@Component({
  selector: 'app-verpagos',
  templateUrl: './verpagos.component.html',
  styleUrls: ['./verpagos.component.scss']
})
export class VerpagosComponent implements OnInit {

  idCliente!: number;
  historial!: HistorialPagosClientes

  constructor(private httpService: PagoService, private params: ActivatedRoute){}

  ngOnInit(): void {
    const {id} = this.params.snapshot.params;
    this.idCliente = id;
    this.getHistoryPagos();
  }

  getHistoryPagos(){
    this.httpService.VerHistorialPagos(this.idCliente).subscribe({
      next:(res: any) => {
        this.historial = res.data
      },
      error:(err) => {
      },
    });
  }

}
