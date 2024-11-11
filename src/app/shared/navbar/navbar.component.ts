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
  isLoggedIn = false;  // Controla si el usuario está autenticado
  nombrePerfil = '';  
  showLoginModal = false;  
  showRegistroModal = false; 
  showPerfilModal = false;  
  showOrdenesModal = false;
  usuario: any = {};
  cantidadCarrito = 0;
  ordenes: any[] = [];

  constructor(private authService: AuthService, private userService: UserService, private orderService: OrderService) {}

  ngOnInit() {
    this.authService.cantidadCarrito$.subscribe((cantidad) => {
      this.cantidadCarrito = cantidad;
    });
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

  abrirOrdenesModal() {
    const usuarioIdString = this.authService.getNumeroIdentificacion();
    const usuarioId = parseInt(usuarioIdString!, 10);
  
    if (usuarioId) {
      this.orderService.obtenerOrdenPorUsuario(usuarioId).subscribe(
        (data) => {
          this.ordenes = data;
          this.showOrdenesModal = true; 
        },
        (error) => {
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
        (data) => {
          this.usuario = data;
          console.log('Datos de usuario cargados', data);
          this.showPerfilModal = true; 
        },
        (error) => {
          console.error('Error al obtener los datos del usuario', error);
        }
      );
    } else {
      console.error('Número de identificación no disponible');
    }
  }
  
  cerrarPerfilModal() {
    this.showPerfilModal = false;
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

  logout() {
    this.isLoggedIn = false;
    this.nombrePerfil = '';
    this.toggleDropdown(); 
  }

  onUserLoggedIn(nombre: string) {
    this.isLoggedIn = true;
    this.nombrePerfil = nombre;
    this.cerrarLoginModal();  
    console.log('Número de Identificación desde AuthService:', this.authService.getNumeroIdentificacion());
  }

  // onUserLoggedIn(nombre: string) {
  //   this.isLoggedIn = true;
  //   this.nombrePerfil = nombre;
  //   this.cerrarLoginModal();  
  // }

}
