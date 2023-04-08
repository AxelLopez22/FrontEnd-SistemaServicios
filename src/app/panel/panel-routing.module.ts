import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { EditClienteComponent } from './components/edit-cliente/edit-cliente.component';
import { ServiciosComponent } from './servicios/servicios.component';

const routes: Routes = [
  {path: '', redirectTo: 'admin/panel', pathMatch: 'full'},
  {path: '', component: PanelComponent, children: [
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/create', component: AddClienteComponent},
    {path: 'clientes/edit/:id', component: EditClienteComponent},
    {path: 'servicios', component: ServiciosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
