import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CarritoService } from './carrito.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private carritoService: CarritoService) { }

  createUser (user: any) {
    return this.http.post('http://localhost:8080/api/registerUsuario', user, { responseType: 'text' })
  }

  login (email: string, contrasenia: string): Observable<any> {
    const user = { email, contrasenia }
    return this.http.post('http://localhost:8080/api/login', user, { responseType: 'text' })
  }

  logout () {
    this.carritoService.limpiarCarrito()
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    this.router.navigate(['/login'])
  }
  getUserBySession (email: string) {
    return this.http.get(`http://localhost:8080/api/getUserBySession?email=${email}`)
      .subscribe(user => {
        localStorage.setItem('currentUser', JSON.stringify(user))
      })
  }
}
