import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export default class ProductListComponent implements OnInit{

  private productService = inject(ProductService);

  products: any[] = [];

  ngOnInit(): void {
      this.productService.listProducts()
      .subscribe((products: any) => {
        this.products = products;
      });
  }

}
