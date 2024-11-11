// import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { OrderService } from '../services/order.service';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   products: any[] = [];
//   scrollPosition = 0;
//   maxScroll = 0;
//   carrito: any[] = [];  

//   @ViewChild('slider', { static: false }) slider!: ElementRef;

//   constructor(private http: HttpClient, 
//     private orderService: OrderService, 
//     private authService: AuthService) 
//     {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts() {
//     this.http.get('http://localhost:8080/api/productos')
//       .subscribe((data: any) => {
//         this.products = data.map((product: any) => ({
//           ...product,
//           quantity: 1 
//         }));
//       });
//   }

//   scrollLeft() {
//     const slider = this.slider.nativeElement;
//     slider.scrollBy({
//       left: -slider.offsetWidth,
//       behavior: 'smooth'
//     });
//   }

//   scrollRight() {
//     const slider = this.slider.nativeElement;
//     slider.scrollBy({
//       left: slider.offsetWidth,
//       behavior: 'smooth'
//     });
//   }

//   increaseQuantity(product: any) {
//     product.quantity++;
//   }

//   decreaseQuantity(product: any) {
//     if (product.quantity > 1) {
//       product.quantity--;
//     }
//   }

//   addToCart(product: any) {
//     console.log('Producto añadido al carrito:', product);
//   }

  

//   agregarAlCarrito(producto: any) {
//     this.carrito.push(producto);
//     alert('Producto añadido al carrito');
 
//     this.authService.actualizarCantidadCarrito(this.carrito.length);
//   }


//   crearOrden() {
//     const usuarioIdString = this.authService.getNumeroIdentificacion(); 
//     const usuarioId = parseInt(usuarioIdString!, 10); 

//     if (!usuarioId) {
//       alert('Por favor, inicia sesión antes de realizar una orden.');
//       return;
//     }

//     if (this.carrito.length === 0) {
//       alert('El carrito está vacío.');
//       return;
//     }

//     this.orderService.crearOrden(usuarioId, this.carrito).subscribe(
//       (response) => {
//         alert('Orden creada exitosamente: ' + response.mensaje);
//         this.carrito = []; 
//       },
//       (error) => {
//         alert('Error al crear la orden: ' + error.message);
//       }
//     );
//   }

// }

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  scrollPosition = 0;

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get('http://localhost:8080/api/productos').subscribe((data: any) => {
      this.products = data.map((product: any) => ({
        ...product,
        quantity: 1 // Inicializamos la cantidad en 1
      }));
    });
  }

  scrollLeft() {
    const slider = this.slider.nativeElement;
    slider.scrollBy({
      left: -slider.offsetWidth,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const slider = this.slider.nativeElement;
    slider.scrollBy({
      left: slider.offsetWidth,
      behavior: 'smooth'
    });
  }

  increaseQuantity(product: any) {
    product.quantity++;
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  crearOrden(producto: any) {
    // Obtener el valor de usuarioId desde el AuthService
    const usuarioIdString = this.authService.getNumeroIdentificacion();
    const usuarioId = parseInt(usuarioIdString!, 10);
  
    if (!usuarioId) {
      alert('Por favor, inicia sesión antes de realizar una orden.');
      return;
    }
  
    // Verificar que el producto existe y tiene un ID válido
    if (!producto || !producto.productoId) {
      console.error('Producto inválido:', producto);
      alert('Producto inválido.');
      return;
    }
  
    // Crear el detalle de la orden
    const detalles = [
      {
        productoId: producto.productoId,
        cantidad: producto.quantity
      }
    ];
  
    console.log('Detalles de la orden:', detalles);
  
    // Llamar al servicio para crear la orden
    this.orderService.crearOrden({ usuarioId, detalles }).subscribe(
      (response) => {
        alert('Orden creada exitosamente: ' + response.mensaje);
      //  this.carrito = []; // Vaciar el carrito después de crear la orden
      },
      (error) => {
        console.error('Error al crear la orden:', error);
        alert('Error al crear la orden: ' + error.message);
      }
    );
  }
  
}
