import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCliente, EditCliente } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ClienteServicesService {
  UrlBase: string = "https://www.sistema-servicios-api.somee.com/api/Cliente"
  //UrlBase: string = "https://localhost:7128/api/Cliente";

  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get(this.UrlBase);
  }
  addCliente(model: CreateCliente){
    return this.http.post(this.UrlBase + '/CreateCliente', model);
  }

  getClienteId(id: number){
    return this.http.get(this.UrlBase + '/' + id);
  }

  UpdateCliente(id: number, model: EditCliente){
    return this.http.put(this.UrlBase + '/actualizarCliente/' + id, model);
  }

  DeleteCliente(id: number){
    return this.http.delete(this.UrlBase + '/delete/' + id);
  }

  ListarClientes(){
    return this.http.get(this.UrlBase + '/ListarClientes');
  }

  GetPlanPayment(id: number){
    return this.http.get(this.UrlBase + '/GetPlanPayment/' + id);
  }
}
