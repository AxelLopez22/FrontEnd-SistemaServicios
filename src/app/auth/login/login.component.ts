import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/panel/models/models';
import { UserService } from 'src/app/panel/services/user.service';
import { AuthServicesService } from '../services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  responseMsg: string = '';

  constructor(private fb: FormBuilder, private route: Router, private httpService: UserService, private saveToken: AuthServicesService,
    private router: Router){
    this.loginForm = this.fb.group({
      email: fb.control('', [Validators.required]),
      password: fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15)
      ])
    });
  }

  ngOnInit(): void {

  }

  login(){
    let user: User = {
      nombreUsuario: this.loginForm.get('email')?.value,
      contrasenia: this.loginForm.get('password')?.value
    }

    this.httpService.login(user).subscribe({
      next: (res:any) => {
        console.log(res);
        if(res.status === 'Ok'){
          this.saveToken.saveToken(res.data.token);
          this.router.navigate(['admin/panel/clientes']);
        } else {
          this.responseMsg = 'Credenciales invalidas';
        }
      },
      error:(err:any) => {

      },
    });
  }

  getUserNameErrors(){
    if(this.Email.hasError('required')) return 'Debe ingresar su nombre de usuario!'
    if(this.Email.hasError('email')) return 'Email is invalid'
    return '';
  }
  getPasswordErrors(){
    if(this.Password.hasError('required')) return 'Debe ingresar su contraseña!';
    if(this.Password.hasError('minLength'))
      return 'La contraseña debe contener al menos 8 caracteres!';
    if(this.Password.hasError('maxLength'))
      return 'La contraseña no debe de contener mas de 15 caracteres!';
    return '';
  }

  get Email(): FormControl{
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }
}
