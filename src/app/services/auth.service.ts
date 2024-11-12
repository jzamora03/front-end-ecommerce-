import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private numeroIdentificacion: string | null = null;
  private cantidadCarrito = new BehaviorSubject<number>(0);
  cantidadCarrito$: Observable<number> = this.cantidadCarrito.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Al inicializar el servicio, verificar si hay una sesión guardada
      const storedNumeroIdentificacion = localStorage.getItem('numeroIdentificacion');
      if (storedNumeroIdentificacion) {
        this.numeroIdentificacion = storedNumeroIdentificacion;
      }
    }
  }

  login(credentials: { numeroIdentificacion: string, password: string }): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/login`, credentials).subscribe(
        (response: any) => {
          this.numeroIdentificacion = credentials.numeroIdentificacion;
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('numeroIdentificacion', credentials.numeroIdentificacion);
          }
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
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('numeroIdentificacion', numeroIdentificacion);
    }
    this.numeroIdentificacion = numeroIdentificacion;
  }

  getNumeroIdentificacion(): string | null {
    return this.numeroIdentificacion;
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('numeroIdentificacion');
    }
    this.numeroIdentificacion = null;  // Limpiar el valor en el servicio
  }

  actualizarCantidadCarrito(cantidad: number) {
    this.cantidadCarrito.next(cantidad);
  }
}
