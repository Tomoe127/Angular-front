import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-form',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export default class UserFormComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  form = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required]],
    contrasenia: ['', [Validators.required]]
  });

  create () {
    const user = this.form.value
    this.userService.createUser(user)
      .subscribe(() => {
        this.router.navigate(['/usuarios'])
      })
  }

}
