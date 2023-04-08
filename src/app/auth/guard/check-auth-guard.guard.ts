import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServicesService } from '../services/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuardGuard implements CanActivate {
  constructor(private serviceAuthentication: AuthServicesService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.serviceAuthentication.isAuthenticated()){
        this.router.navigate(['admin/auth'])
        return false
      }
      return true
  }

}
