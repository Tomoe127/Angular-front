import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  listProducts() {
    return this.http.get('http://localhost:8080/maintenance/productos');
  }

}
