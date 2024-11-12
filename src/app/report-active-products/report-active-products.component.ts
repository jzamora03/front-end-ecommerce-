import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-report-active-products',
  templateUrl: './report-active-products.component.html',
  styleUrl: './report-active-products.component.css'
})
export class ReportActiveProductsComponent implements OnInit {
  productosActivos: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cargarProductosActivos();
  }

  cargarProductosActivos() {
    this.productService.obtenerProductosActivos().subscribe(
      (data) => {
        this.productosActivos = data;
        console.log(this.productosActivos);  // Verifica si los productos activos están llegando
      },
      (error) => {
        console.error('Error al cargar los productos activos:', error);
      }
    );
  }
}
