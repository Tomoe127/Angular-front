import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos
  listProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/productos`);
  }
}
