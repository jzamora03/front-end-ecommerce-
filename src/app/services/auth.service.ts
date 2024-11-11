import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private numeroIdentificacion: string | null = null; // Para almacenar la identificación del usuario logueado
  private cantidadCarrito = new BehaviorSubject<number>(0);
  cantidadCarrito$: Observable<number> = this.cantidadCarrito.asObservable();

  constructor(private http: HttpClient) { }

  // login(credentials: { numeroIdentificacion: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }

  login(credentials: { numeroIdentificacion: string, password: string }): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/login`, credentials).subscribe(
        (response: any) => {
          this.numeroIdentificacion = credentials.numeroIdentificacion; // Almacenar la identificación
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  register(user: { username: string, password: string, email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  setNumeroIdentificacion(numeroIdentificacion: string) {
    localStorage.setItem('numeroIdentificacion', numeroIdentificacion);
  }

  getNumeroIdentificacion(): string | null {
    return this.numeroIdentificacion;
  }

  logout() {
    localStorage.removeItem('numeroIdentificacion');
  }

  actualizarCantidadCarrito(cantidad: number) {
    this.cantidadCarrito.next(cantidad);
  }
}