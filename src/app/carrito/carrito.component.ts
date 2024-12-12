import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carritoProductos: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoProductos = this.carritoService.obtenerProductos();
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
    this.carritoProductos = this.carritoService.obtenerProductos();
  }

  calcularPrecioTotal(): number {
    return this.carritoService.calcularPrecioTotal();
  }
}