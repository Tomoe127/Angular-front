import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost:8080/api'; // Adjust this to your Spring backend URL

  constructor(private http: HttpClient) { }

  registrarVenta(ventaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrarVenta`, ventaData, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 201) {
            return response.body;
          } else {
            throw new Error('Unexpected response status');
          }
        })
      );
  }
}
