import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { CardServicioComponent } from './components/card-servicio/card-servicio.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LimitarDigitosDirective } from './directive/limitar-digitos.directive';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import { AddPlanComponent } from './components/add-plan/add-plan.component';
import { EditPlanComponent } from './components/edit-plan/edit-plan.component';

@NgModule({
  declarations: [
    PanelComponent,
    HeaderComponent,
    SideNavComponent,
    ClientesComponent,
    AddClienteComponent,
    EditClienteComponent,
    ServiciosComponent,
    CardServicioComponent,
    LimitarDigitosDirective,
    InicioComponent,
    FooterComponent,
    AddPlanComponent,
    EditPlanComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers:[DatePipe]
})
export class PanelModule { }
