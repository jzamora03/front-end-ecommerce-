import { Component } from '@angular/core';
import { VisibilityService } from './services/visibility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarReporteProductosActivos: boolean = false;

  constructor(private visibilityService: VisibilityService) {
    this.visibilityService.mostrarReporte$.subscribe(
      (mostrar) => {
        this.mostrarReporteProductosActivos = mostrar;
      }
    );
  }
}
