import { Component, Input, OnInit } from '@angular/core';
import { Servicio } from '../models/models';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  service: Servicio[] = []

  constructor(private listar: ServicesService){}

  ngOnInit(): void {
    this.ListarServicio();
  }

  search(value: string){

  }

  ListarServicio(){
    this.listar.ListarServicio().subscribe({
      next:(res: any) => {
        console.log(res);
          this.service = res.data;
      },error:(err:any) => {
          console.log('Error ' + err);
      },
    });
  }
}



