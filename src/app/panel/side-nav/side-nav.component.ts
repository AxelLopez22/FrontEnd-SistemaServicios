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
      tittle: 'Inicio',
      link: 'inicio',
      icon: 'home'
    },
    {
      tittle: 'Clientes',
      link: 'clientes',
      icon: 'recent_actors'
    },
    {
      tittle: 'Servicios',
      link: 'servicios',
      icon: 'business'
    },
    {
      tittle: 'Pagos',
      link: 'pagos',
      icon: 'monetization_on'
    }
  ];
}
