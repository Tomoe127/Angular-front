import { Component, OnInit } from '@angular/core'
import { CarritoService } from '../services/carrito.service'
import { HeaderComponent } from '../components/header/header.component'
import { FooterComponent } from '../components/footer/footer.component'
import { CommonModule } from '@angular/common'
import { RouterLink, Router } from '@angular/router'

@Component({
  selector: 'app-carrito',
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carritoProductos: any[] = [];
  showModal: boolean = false;
  constructor(private carritoService: CarritoService, private router: Router) { }

  ngOnInit (): void {
    this.carritoProductos = this.carritoService.obtenerProductos()
  }

  eliminarProducto (id: number): void {
    this.carritoService.eliminarProducto(id)
    this.carritoProductos = this.carritoService.obtenerProductos()
  }

  calcularPrecioTotal (): number {
    return this.carritoService.calcularPrecioTotal()
  }
  checkout () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

    // Si el usuario está logueado y tiene un id, usarlo
    const usuarioId = currentUser.id
    this.carritoService.checkout(usuarioId).subscribe(
      response => {
        console.log('Venta registrada exitosamente', response)
        this.carritoService.limpiarCarrito()
        this.carritoProductos = []
        // Redirect to the products page
        this.router.navigate(['/productos'])
      },
      error => {
        if (error.status === 201) {
          console.log('Venta registrada exitosamente', error)
          this.carritoService.limpiarCarrito()
          this.carritoProductos = []
          // Redirect to the products page
          this.router.navigate(['/productos'])
        } else {
          console.error('Error al registrar la venta', error)
          // Handle other types of errors (show error message to user)
        }
      }
    )


  }
  agregarCantidad (productId: number): void {
    const producto = this.carritoProductos.find(p => p.id === productId)
    if (producto) {
      producto.cantidad += 1
    }
  }
  openModal () {
    this.showModal = true
  }

  // Método para cerrar el modal
  cerrarModal () {
    this.showModal = false
  }

  // Método para confirmar el pago
  confirmarPago () {
    this.showModal = false
    // Aquí puedes agregar el proceso de pago o redirigir a otra página
    this.router.navigate(['/carrito'])
  }

}
