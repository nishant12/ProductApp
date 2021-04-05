import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any;
  currentProduct = null;
  currentIndex = -1;
  name = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.readProducts();
  }

  readProducts(): void {
    this.productService.getAll().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setCurrentProduct(product, index): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  searchByName(): void {
    this.productService.searchByName(this.name).subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
