import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrearPlan } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  UrlBase: string = "https://localhost:7128/api/Services";
  constructor(private http: HttpClient) { }

  ListarServicio(){
    return this.http.get(this.UrlBase + '/listarServicio');
  }

  ListarCategorias(){
    return this.http.get(this.UrlBase + '/categoriaServicios');
  }

  CrearPlan(plan: CrearPlan){
    return this.http.post(this.UrlBase + '/crearPlan', plan);
  }
}
