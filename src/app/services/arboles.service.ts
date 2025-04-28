import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Env from '../Enviroment';
import { Observable } from 'rxjs';
import { Arbol } from '../models/arbol.model';
import { loginnCreds } from '../models/loginCreds';

@Injectable({
  providedIn: 'root'
})
export default class ArbolesService {

  constructor(private http: HttpClient) { }

  GetArboles(formData: FormData): Observable<{ data: Arbol[] }> {
    return this.http.get<{ data: Arbol[] }>(`${Env.api}arbol/location`);
  }  
  // Obtener token de localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('token'); // O sessionStorage.getItem('token')
  }

  // Crear árbol
  CreateArboles(arbolData: any): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    
    // Enviar el objeto JSON al servidor usando POST
    return this.http.post(`${Env.api}arbol/create`, arbolData, { headers });
  }
  

  // Actualizar árbol
  UpdateArboles(arbolData: any): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put(`${Env.api}arbol/update`, arbolData, { headers });
  }
  

  // Eliminar árbol
  DeleteArboles(id: number): Observable<void> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete<void>(`${Env.api}arbol/delete/${id}`, { headers });
  }

  // Cargar árboles desde archivo Excel
  uploadArbolFile(formData: FormData) {

    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${Env.api}arbol/file`, formData, { headers });
  }
  

  // =---------------------------------------------------------

  public login = (creds:loginnCreds) => {
    return this.http.post<loginnCreds>(Env.api + "auth/login", creds) ;
  }
  createAdmin(data: any) {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(data);
    return this.http.post(Env.api + "auth/create/admin", data, { headers });
  }
  
  

}
