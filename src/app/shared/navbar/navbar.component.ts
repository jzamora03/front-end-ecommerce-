import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'; 
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  dropdownOpen = false;
  isLoggedIn = false;
  usuario: any = {};
  nombrePerfil = '';
  showLoginModal = false;
  showRegistroModal = false;
  showPerfilModal = false;
  showOrdenesModal = false;
  showProductoModal = false;  // Controla si se muestra el modal de productos
  cantidadCarrito = 0;
  ordenes: any[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.authService.cantidadCarrito$.subscribe((cantidad) => {
      this.cantidadCarrito = cantidad;
    });

    const numeroIdentificacion = this.authService.getNumeroIdentificacion();
    if (numeroIdentificacion) {
      // El usuario está autenticado
      this.isLoggedIn = true;
      this.nombrePerfil = numeroIdentificacion;
    } else {
      // El usuario no está autenticado
      this.isLoggedIn = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  abrirLoginModal() {
    this.showLoginModal = true;
  }

  cerrarLoginModal() {
    this.showLoginModal = false;
  }

  abrirRegistroModal() {
    this.showRegistroModal = true;
  }

  cerrarRegistroModal() {
    this.showRegistroModal = false;
  }

  abrirProductoModal() {
    console.log('Intentando abrir el modal de productos');
    this.showProductoModal = true;  // Abre el modal de productos
  }

  cerrarProductoModal() {
    console.log('Cerrando el modal de productos');
    this.showProductoModal = false;  // Cierra el modal de productos
  }

  abrirOrdenesModal() {
    const usuarioIdString = this.authService.getNumeroIdentificacion();
    const usuarioId = parseInt(usuarioIdString!, 10);

    if (usuarioId) {
      this.orderService.obtenerOrdenPorUsuario(usuarioId).subscribe(
        (data: any) => {
          this.ordenes = data;
          this.showOrdenesModal = true;
        },
        (error: any) => {
          console.error('Error al obtener las órdenes', error);
        }
      );
    } else {
      console.error('Número de identificación no disponible');
    }
  }

  cerrarOrdenesModal() {
    this.showOrdenesModal = false;
  }

  abrirPerfilModal() {
    const numeroIdentificacion = this.authService.getNumeroIdentificacion();
    if (numeroIdentificacion) {
      this.userService.getUserByNumeroIdentificacion(numeroIdentificacion).subscribe(
        (data: any) => {
          this.showPerfilModal = true;
        },
        (error: any) => {
          console.error('Error al obtener los datos del usuario', error);
        }
      );
    } else {
      console.error('Número de identificación no disponible');
    }
  }

  actualizarPerfil() {
    const numeroIdentificacion = this.authService.getNumeroIdentificacion();
    if (numeroIdentificacion) {
      this.userService.updateUser(numeroIdentificacion, this.usuario).subscribe(
        (response) => {
          console.log('Perfil actualizado correctamente', response);
          this.cerrarPerfilModal();
        },
        (error) => {
          console.error('Error al actualizar el perfil', error);
        }
      );
    }
  }

  cerrarPerfilModal() {
    this.showPerfilModal = false;
  }

  logout() {
    this.isLoggedIn = false;
    this.nombrePerfil = '';
    this.toggleDropdown();
  }

  onUserLoggedIn(nombre: string) {
    this.isLoggedIn = true;
    this.nombrePerfil = nombre;
    this.cerrarLoginModal();
  }

  actualizarProductos() {
    console.log('Lista de productos actualizada desde el componente hijo');
  }
}
