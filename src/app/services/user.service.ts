import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CarritoService } from './carrito.service'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private carritoService: CarritoService) { 
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
  }
}

  createUser (user: any) {
    return this.http.post('http://localhost:8080/api/registerUsuario', user, { responseType: 'text' })
  }

  login (email: string, contrasenia: string): Observable<any> {
    const user = { email, contrasenia }
    return this.http.post('http://localhost:8080/api/login', user, { responseType: 'text' })
  }

  logout () {
    this.carritoService.limpiarCarrito();
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  getUserBySession(email: string) {
    return this.http.get(`http://localhost:8080/api/getUserBySession?email=${email}`).subscribe((user: any) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    });
  }
}
