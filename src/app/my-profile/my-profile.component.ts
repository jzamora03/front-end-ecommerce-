import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profileForm: FormGroup;
  userId: string = ''; // Número de identificación del usuario autenticado

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      cargo: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Suponemos que el número de identificación se almacena en el localStorage al iniciar sesión
    this.userId = localStorage.getItem('numeroIdentificacion') || '';

    if (this.userId) {
      this.userService.getUserByNumeroIdentificacion(this.userId).subscribe(
        response => {
          this.profileForm.patchValue({
            nombreCompleto: response.nombreCompleto,
            cargo: response.cargo,
            password: '' // No cargamos la contraseña por seguridad
          });
        },
        error => {
          console.error('Error al obtener el perfil del usuario', error);
        }
      );
    }
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.userId, this.profileForm.value).subscribe(
        response => {
          console.log('Perfil actualizado correctamente', response);
          alert('Perfil actualizado correctamente');
        },
        error => {
          console.error('Error al actualizar el perfil', error);
        }
      );
    }
  }
}
