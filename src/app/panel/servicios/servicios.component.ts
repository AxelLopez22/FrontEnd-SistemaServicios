import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  longText = `Paramount+ $4.99 al mes. Prime Video: $5.99 a partir del 4to mes. HBO MAX: $5.99 a partir del 2do mes. Todos los precios incluyen IVA`;
  longText2 = `Paramount+ $4.99 al mes. Prime Video: $5.99 a partir del 4to mes. HBO MAX: $5.99 a partir del 3er mes. ViX+
  $5.99 a partir del 2do mes. Universal+ $5.90 mes. Todos los precios incluyen IVA`;
  constructor(){}

  ngOnInit(): void {

  }

  search(value: string){

  }
}



