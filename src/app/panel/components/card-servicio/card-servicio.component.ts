import { Component, Input, OnInit } from '@angular/core';
import { Servicio } from '../../models/models';
import { ServiciosComponent } from '../../servicios/servicios.component';
import {ClienteServicesService} from '../../services/cliente-services.service';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-card-servicio',
  templateUrl: './card-servicio.component.html',
  styleUrls: ['./card-servicio.component.scss']
})
export class CardServicioComponent implements OnInit {
  @Input() cardService: Servicio = {
    categoria: '',
    nombre: '',
    descripcion: '',
    precio: 0
  }
  
  

  constructor(){

  }
  
  ngOnInit(): void {
    
  }

  
}
