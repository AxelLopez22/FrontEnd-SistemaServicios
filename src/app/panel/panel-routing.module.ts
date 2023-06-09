import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { EditClienteComponent } from './components/edit-cliente/edit-cliente.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { InicioComponent } from './inicio/inicio.component';
import { AddPlanComponent } from './components/add-plan/add-plan.component';
import { EditPlanComponent } from './components/edit-plan/edit-plan.component';
import { PagosComponent } from './pagos/pagos.component';
import { AddPagoComponent } from './components/add-pago/add-pago.component';
import { VerpagosComponent } from './components/verpagos/verpagos.component';

const routes: Routes = [
  {path: '', redirectTo: 'admin/panel', pathMatch: 'full'},
  {path: '', component: PanelComponent, children: [
    {path: 'inicio', component: InicioComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/create', component: AddClienteComponent},
    {path: 'clientes/edit/:id', component: EditClienteComponent},
    {path: 'servicios', component: ServiciosComponent},
    {path: 'servicios/create', component: AddPlanComponent},
    {path: 'servicios/edit/:id', component: EditPlanComponent},
    {path: 'pagos', component: PagosComponent},
    {path: 'pagos/create', component: AddPagoComponent},
    {path: 'pagos/verPagos/:id', component: VerpagosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
