import { Component, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent {
  @Output() productosActualizados = new EventEmitter<void>();

  producto: any = {};
  products: any[] = [];
  isEditMode: boolean = false;
  mostrarMensaje: boolean = false;
  mensaje: string = '';

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  abrirProductoModal() {
    this.isEditMode = false;
    this.producto = {};
  }

  abrirEditarProductoModal(product: any) {
    this.isEditMode = true;
    this.producto = { ...product }; 
  }

  cerrarProductoModal() {
    window.location.reload();
  }

  guardarProducto() {
    if (this.isEditMode) {
      if (this.producto.productoId) {
        this.productService.actualizarProducto(this.producto.productoId, this.producto).subscribe(
          (response) => {
            this.mostrarMensajeNotificacion('Producto actualizado con éxito');
            this.productosActualizados.emit(); 
            this.cerrarProductoModal();
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
            this.mostrarMensajeNotificacion('Hubo un error al actualizar el producto');
          }
        );
      }
    } else {
      this.productService.crearProducto(this.producto).subscribe(
        (response) => {
          this.mostrarMensajeNotificacion('Producto creado con éxito');
          this.productosActualizados.emit(); 
          this.cerrarProductoModal();
        },
        (error) => {
          console.error('Error al crear el producto:', error);
          this.mostrarMensajeNotificacion('Hubo un error al crear el producto');
        }
      );
    }
  }

  eliminarProducto(productId: number) {
    if (productId) {
      this.productService.eliminarProducto(productId).subscribe(
        (response) => {
          this.mostrarMensajeNotificacion('Producto eliminado correctamente');
          this.productosActualizados.emit(); 
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
          this.mostrarMensajeNotificacion('Hubo un error al eliminar el producto');
        }
      );
    }
  }

  mostrarMensajeNotificacion(mensaje: string) {
    this.mensaje = mensaje;
    this.mostrarMensaje = true;
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000);
  }

  loadProducts() {
    this.productService.obtenerProductos().subscribe(
      (data: any) => {
        this.products = data;
        console.log(this.products); // Para verificar si el valor de 'producto_activo' está siendo correctamente cargado
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }
}
