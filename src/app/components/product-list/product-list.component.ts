import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService)

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products)=> this.productService.products.set(products),
      error: (err)=>console.log(err)
    })
  }

  
}
