import { Component, inject } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  imports: [RouterModule]
})
export default class UserDetailComponent {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  selectedUser: any = null;

  constructor() {
    const userId = this.route.snapshot.paramMap.get('id')
    if (userId) {
      this.userService.getUserById(+userId).subscribe((user) => {
        this.selectedUser = user
      })
    }
  }
}
