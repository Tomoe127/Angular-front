import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: any[] = [];

  constructor() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  agregarProducto(producto: any): void {
    const productoExistente = this.carrito.find((p) => p.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      const nuevoProducto = { ...producto, cantidad: 1 };
      this.carrito.push(nuevoProducto);
    }
    this.actualizarCarrito();
  }

  obtenerProductos(): any[] {
    return this.carrito;
  }

  // Modificado para reducir la cantidad en lugar de eliminar el producto
  eliminarProducto(id: number): void {
    const producto = this.carrito.find((p) => p.id === id);

    if (producto) {
      if (producto.cantidad > 1) {
        producto.cantidad--; // Reducir la cantidad
      } else {
        this.carrito = this.carrito.filter((p) => p.id !== id); // Eliminar el producto si la cantidad es 1
      }
    }

    this.actualizarCarrito();
  }

  calcularPrecioTotal(): number {
    return this.carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  }

  private actualizarCarrito(): void {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}
