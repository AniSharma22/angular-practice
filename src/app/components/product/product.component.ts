import { Component, computed, Inject, inject, input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Role } from '../../models/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [ConfirmationService, MessageService],
})

export class ProductComponent {
  id = input.required<number>();
  title = input.required<string>();
  price = input.required<number>();
  description = input.required<string>();
  category = input.required<string>();
  imageUrl = input.required<string>();
  productService = inject(ProductService);
  confirmationService = Inject(ConfirmationService);
  messageService = inject(MessageService);

  confirmDelete() {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (userConfirmed) {
      this.deleteProduct();
    }
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id()).subscribe({
      next: (data) => {
        console.log('Product deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      },
    });
    this.productService.products.update((productsArray) => {
      return productsArray.filter((product) => product.id !== this.id());
    });
  }
}
