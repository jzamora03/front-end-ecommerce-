import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearProducto`, producto);
  }

  obtenerProductoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarProducto(productoId: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productoId}`, producto);
  }
  
  eliminarProducto(productoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productoId}`);
  }
  
  obtenerProductosActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activos`);
  }
}
