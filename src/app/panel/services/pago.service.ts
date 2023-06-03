import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgregarPago } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  url = "https://www.sistema-servicios-api.somee.com/api/Pago"
  //url = "https://localhost:7128/api/Pago";

  constructor(private http: HttpClient) { }

  listarPagos(){
    return this.http.get(this.url + '/listarPagosClientes');
  }

  AgregarPago(model: AgregarPago){
    return this.http.post(this.url + '/agregarPago', model);
  }

  VerHistorialPagos(id: number){
    return this.http.get(this.url + '/historialPagos/' + id);
  }
}
