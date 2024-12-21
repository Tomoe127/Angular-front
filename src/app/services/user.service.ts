import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CarritoService } from './carrito.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private carritoService: CarritoService) {}

  createUser (user: any) {
    return this.http.post('http://localhost:8080/api/registerUsuario', user, { responseType: 'text' })
  }

  login (email: string, contrasenia: string) {
    const user = { email, contrasenia }
    return this.http.post('http://localhost:8080/api/login', user, { responseType: 'text' })

  }

  logout() {
    this.carritoService.limpiarCarrito();
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
  
}
