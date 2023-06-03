import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrearPlan, EditarPlan } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  UrlBase: string = "https://www.sistema-servicios-api.somee.com/api/Services"
  //UrlBase: string = "https://localhost:7128/api/Services";
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

  GetPlanById(id: number){
    return this.http.get(this.UrlBase + `/${id}`);
  }

  EditarPlan(id: number, model: EditarPlan){
    return this.http.put(this.UrlBase + `/editarPlan/${id}`, model);
  }
}
