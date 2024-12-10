import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  listUsers() {
    return this.http.get('http://localhost:8080/api/usuarios');
  }
  createUser(user: any) {
    return this.http.post('http://localhost:8080/api/ingreso', user, { responseType: 'text' });
  }
}
