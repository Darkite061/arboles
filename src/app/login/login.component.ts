import { Component } from '@angular/core';
import ArbolesService from '../services/arboles.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import alerts from '../Alert/Alerts';
import { loginnCreds } from '../models/loginCreds';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private web: ArbolesService, private routes: Router, private authService: AuthService){
    if(this.authService.isAutenticated()){
      this.routes.navigate(['admin']);
    }else{
      this.routes.navigate(['login']);
    }
  }
  login(e: Event){
    e.preventDefault();

    let np: HTMLInputElement = document.getElementById('correo') as HTMLInputElement;
    let pass: HTMLInputElement = document.getElementById('pass') as HTMLInputElement;

    if(np.value === ''){
      alerts.Error('Error de llenado de campos', 'El correo es necesario!');
      return;
    }else if(pass.value === ''){
      alerts.Error('Error de llenado de campos', 'La contraseña es necesaria!');
      return;
    }

    let data: loginnCreds = {
      username: np.value.trim(),
      password: pass.value.trim()
    }

    alerts.Loading('iniciando Sesion','Se esta comprobando tus credenciales...\nEspere un poco');

    this.web.login(data).subscribe(
      (response: any) => {
        alerts.changeSpinnerToCheckmark();
        setTimeout(() => {
          alerts.CloseAlert();
    
          if (response.token) {
            localStorage.setItem('token', response.token); // Guardamos el token en el localStorage
            this.authService.login({ token: response.token }); // Puedes guardar en sessionStorage o localStorage
    
            this.routes.navigate(['admin']);
          } else {
            alerts.Error('Error', 'No se recibió un token.');
          }
    
        }, 250);
      },
      (error: HttpErrorResponse) => {
        alerts.CloseAlert();
        const errorMessage = error.error?.Message || 'Ocurrió un error inesperado.';
        alerts.Error('Error al intentar iniciar sesión', errorMessage);
      }
    );
  }        
}
