import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckAuthGuardGuard } from './auth/guard/check-auth-guard.guard';
import { LoginGuardGuard } from './auth/guard/login-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'admin/panel', pathMatch:'full'},
  {path: 'admin/panel', loadChildren: () => import('../app/panel/panel.module').then(x => x.PanelModule)},
  {path: 'admin/auth', loadChildren: () => import('../app/auth/auth.module').then(x => x.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
