import { Component, inject, OnInit } from '@angular/core'
import { UserService } from '../services/user.service'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-user-list',
  imports: [RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export default class UserListComponent implements OnInit {

  private userService = inject(UserService);

  users: any[] = [];

  ngOnInit (): void {
    this.loadUsers()
  }

  loadUsers (): void {
    this.userService.listUsers()
      .subscribe((users: any) => {
        this.users = users
      })
  }

  deleteUser (id: number): void {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?')

    if (confirmed) {
      this.userService.deleteUser(id).subscribe(() => {
        console.log(`Usuario con id ${id} eliminado`)
        this.loadUsers()
      })
    } else {
      console.log('Eliminación cancelada')
    }
  }
}