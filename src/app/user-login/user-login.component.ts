import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export default class UserLoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  formlogin = this.fb.group({
    email: ['', [Validators.required], [Validators.email]],
    contrasenia: ['', [Validators.required]]
  });

  login(){
    const user = this.formlogin.value;

    this.userService.login(user.email!, user.contrasenia!)
    .subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
      },
      error: () => {
        alert('Usuario o contraseña incorrectos');
      } 
    });
  }

}
