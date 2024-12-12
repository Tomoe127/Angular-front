import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export default class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false; // Controla la visibilidad de la contraseña
  showConfirmPassword: boolean = false; // Controla la visibilidad de la co

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasenia: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const contrasenia = form.get('contrasenia');
    const confirmarContrasenia = form.get('confirmarContrasenia');

    return contrasenia && confirmarContrasenia && contrasenia.value === confirmarContrasenia.value 
      ? null 
      : { passwordMismatch: true };
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const usuario = {
        id: 0,
        nombre: this.registroForm.value.nombre,
        email: this.registroForm.value.email,
        contrasenia: this.registroForm.value.contrasenia,
        rolId: 2
      };

      this.userService.createUser(usuario).subscribe({
        next: (response) => {
          console.log('Usuario registrado exitosamente', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error en el registro', error);
          this.errorMessage = 'Error al registrar. Intenta nuevamente.';
        }
      });
    }
  }
}