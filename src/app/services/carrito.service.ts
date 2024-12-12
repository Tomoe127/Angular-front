import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: any[] = [];

  constructor() {
    // Intentamos cargar los productos del carrito desde localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  // Método para agregar un producto al carrito
  agregarProducto(producto: any): void {
    this.carrito.push(producto);
    this.actualizarCarrito(); // Guardamos los cambios en localStorage
  }

  // Método para obtener los productos en el carrito
  obtenerProductos(): any[] {
    return this.carrito;
  }

  // Método para eliminar un producto del carrito
  eliminarProducto(id: number): void {
    this.carrito = this.carrito.filter((producto) => producto.id !== id);
    this.actualizarCarrito(); // Guardamos los cambios en localStorage
  }

  // Método para calcular el precio total del carrito
  calcularPrecioTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio, 0);
  }

  // Método privado para actualizar el carrito en localStorage
  private actualizarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}