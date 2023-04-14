import { Component, Input, OnInit } from '@angular/core';
import { Servicio } from '../../models/models';

@Component({
  selector: 'app-card-servicio',
  templateUrl: './card-servicio.component.html',
  styleUrls: ['./card-servicio.component.scss']
})
export class CardServicioComponent implements OnInit {
  @Input() cardService: any = {
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
