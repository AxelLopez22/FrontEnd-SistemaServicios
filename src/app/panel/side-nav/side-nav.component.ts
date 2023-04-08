import { Component } from '@angular/core';
import { SideNavItem } from '../models/models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  sideNavContent: SideNavItem[] = [
    {
      tittle: 'Clientes',
      link: 'clientes'
    },
    {
      tittle: 'Servicios',
      link: 'servicios'
    },
    {
      tittle: 'Usuarios',
      link: 'usuarios'
    },
    {
      tittle: 'Configuracion',
      link: 'configuracion'
    }
  ];
}
