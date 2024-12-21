import { Component, inject, type OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private userService = inject(UserService);
  userName: string = '';

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      this.userName = user?.nombre || 'Invitado';
    });
  }

  logout() {
    this.userService.logout();
  }
}
