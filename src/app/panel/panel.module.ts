import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditClienteComponent } from './components/edit-cliente/edit-cliente.component';
import { ServiciosComponent } from './servicios/servicios.component';

@NgModule({
  declarations: [
    PanelComponent,
    HeaderComponent,
    SideNavComponent,
    ClientesComponent,
    AddClienteComponent,
    EditClienteComponent,
    ServiciosComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ]
})
export class PanelModule { }
