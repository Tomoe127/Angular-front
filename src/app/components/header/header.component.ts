import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private userService = inject(UserService); // Inyecta el servicio
  userName: string

  constructor() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    this.userName = currentUser.nombre || 'Invitado' // Asignar el nombre del usuario o 'Invitado'
  }

  logout () {
    this.userService.logout()
  }

}
