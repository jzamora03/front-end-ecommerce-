import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/ordenes';

  constructor(private http: HttpClient) {}

  crearOrden(ordenData: { usuarioId: number; detalles: any[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearOrden`, ordenData);
  }

  obtenerOrdenPorUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}
