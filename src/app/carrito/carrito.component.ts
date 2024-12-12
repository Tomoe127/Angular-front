import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-carrito',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carritoProductos: any[] = []; // Aquí almacenamos los productos del carrito

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    // Recuperamos los productos del carrito al cargar el componente
    this.carritoProductos = this.carritoService.obtenerProductos();
  }

  // Método para eliminar productos del carrito
  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
    // Actualizamos el carrito después de eliminar el producto
    this.carritoProductos = this.carritoService.obtenerProductos();
  }

  calcularPrecioTotal(): number {
    return this.carritoService.calcularPrecioTotal(); // Calcula el total
  }
}