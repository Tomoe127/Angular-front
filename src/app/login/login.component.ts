import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string | null = null;
  isLoading = false;
  showPassword = false;

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      const { email, contrasenia } = this.loginForm.value;
      
      this.userService.login(email!, contrasenia!).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Aquí puedes manejar la respuesta exitosa, por ejemplo:
          // - Guardar el token en localStorage
          // - Redirigir al usuario a la página principal
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login fallido. Por favor, verifica tus credenciales.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
