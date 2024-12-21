import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CarritoService } from '../services/carrito.service'; // Inyectamos el servicio del carrito
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export default class ProductListComponent implements OnInit {
  products: any[] = [];

  filteredProducts: any[] = [];	

  isLoading: boolean =true

  errorMessage: string = '';
  noResults: boolean = false;
  searchQuery: string = '';
  
  constructor(
    private productService: ProductService,
    private carritoService: CarritoService  // Inyectamos el servicio para el carrito
  ) {}

  ngOnInit(): void {
    this.productService.listProducts().subscribe((products: any) => {
      this.products = products;
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.listProducts().subscribe(
      (products: any) => {
        this.products = products;
        this.filteredProducts = [...this.products]; // Inicializa con todos los productos
        this.isLoading = false; // Carga completada
        this.noResults = this.filteredProducts.length === 0; // Verifica si no hay productos
      },
      (error) => {
        this.errorMessage = 'Error al cargar los productos. Intente nuevamente más tarde.';
        console.error('Error:', error);
        this.isLoading = false; // Carga fallida
      }
    );
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.searchQuery = query;
    this.filteredProducts = this.products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(query) || // Filtro por nombre
        product.descripcion.toLowerCase().includes(query) // Filtro por descripción
    );
    this.noResults = this.filteredProducts.length === 0; 
  }

  // Método para añadir productos al carrito
  addToCart(product: any): void {
    this.carritoService.agregarProducto(product);

 // Mostrar la notificación de tipo toast con SweetAlert2
    Swal.fire({
      toast: true, // Habilita la notificación tipo toast
      position: 'bottom', // Se posiciona en la parte inferior
      icon: 'success',
      title: `${product.nombre} ha sido añadido al carrito`,
      showConfirmButton: false, // No muestra el botón de confirmar
      timer: 3000, // Duración de la notificación en milisegundos
      timerProgressBar: true, // Muestra una barra de progreso
      background: '#333', // Fondo oscuro
      color: '#fff', // Texto blanco
      showClass: {
        popup: 'animate__animated animate__fadeIn', // Animación de entrada (fade-in)
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut', // Animación de salida (fade-out)
      },
      customClass: {
        popup: 'swal-toast', // Clase personalizada para mejorar la apariencia
      },
    });
  }
}