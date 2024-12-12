import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CarritoService } from '../services/carrito.service'; // Inyectamos el servicio del carrito

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-product-list',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export default class ProductListComponent implements OnInit {
  products: any[] = []; 

  constructor(
    private productService: ProductService,
    private carritoService: CarritoService  // Inyectamos el servicio para el carrito
  ) {}

  ngOnInit(): void {
    this.productService.listProducts().subscribe((products: any) => {
      this.products = products;
    });
  }

  // Método para añadir productos al carrito
  addToCart(product: any): void {
    this.carritoService.agregarProducto(product);
    alert(`${product.nombre} añadido al carrito.`);
  }
}