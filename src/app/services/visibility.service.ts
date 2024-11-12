import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private mostrarReporteSubject = new BehaviorSubject<boolean>(false);
  mostrarReporte$ = this.mostrarReporteSubject.asObservable();

  toggleReporte() {
    // Alterna el valor actual entre verdadero y falso
    this.mostrarReporteSubject.next(!this.mostrarReporteSubject.value);
  }
}
