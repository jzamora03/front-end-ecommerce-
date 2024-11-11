import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() userLoggedIn = new EventEmitter<string>();  // Emitiremos el nombre del usuario al iniciar sesión
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      numeroIdentificacion: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Login exitoso', response);
          const nombrePerfil = response.nombre; // Asumimos que `nombre` viene en la respuesta
          this.userLoggedIn.emit(nombrePerfil);  // Emitimos el nombre del perfil
        },
        error => {
          console.error('Error al iniciar sesión', error);
        }
      );
    }
  }
}
