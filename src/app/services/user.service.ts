import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  createUser (user: any) {
    return this.http.post('http://localhost:8080/api/registerUsuario', user, { responseType: 'text' })
  }

  login (email: string, contrasenia: string) {
    const user = { email, contrasenia }
    return this.http.post('http://localhost:8080/api/login', user, { responseType: 'text' })

  }
}
