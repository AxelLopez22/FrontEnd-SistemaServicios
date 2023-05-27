import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServicesService } from 'src/app/auth/services/auth-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<boolean>();
  usernameAuthenticated:string = '';

  constructor(private spinner:NgxSpinnerService, private httpService: AuthServicesService, private router:Router){

  }

  ngOnInit(): void {
    this.usernameAuthenticated = this.httpService.getUsernameAuthenticated();
  }

  logout(){
    this.spinner.show();
    localStorage.removeItem('token');
    setTimeout(() => {
      this.spinner.hide();
      this.httpService.logout();
      this.router.navigateByUrl("/login");
    }, 2000);
  }
}
