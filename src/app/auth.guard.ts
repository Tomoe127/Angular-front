import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Si el token existe, se permite el acceso a la ruta
      return true;
    } else {
      // Si no hay token, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
