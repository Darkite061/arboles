import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Usamos localStorage o sessionStorage
    if (token) {
      // Clonamos la solicitud y añadimos la cabecera de autorización con el token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request); // Procedemos con la solicitud
  }
}
