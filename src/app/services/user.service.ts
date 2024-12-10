import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  listUsers () {
    return this.http.get('http://localhost:8080/maintenance/usuarios')
  }
  createUser (user: any) {
    return this.http.post('http://localhost:8080/maintenance/registerUsuario', user, { responseType: 'text' })
  }
}
