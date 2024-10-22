import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { item, product, Role } from '../models/models';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  products = signal<product[]>([]);
  activeRole = signal<Role>(Role.user);

  constructor(private httpClient: HttpClient) {}

  deleteProduct(id: number) {
    return this.httpClient.delete(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
  }

  getAllProducts() {
    return this.httpClient.get<product[]>(
      'https://api.escuelajs.co/api/v1/products'
    );
  }

  addProduct(item: item) {
    return this.httpClient.post('https://api.escuelajs.co/api/v1/products/', {
      title: item.title,
      price: item.price,
      description: item.description,
      categoryId: item.categoryId,
      images: item.images,
    });
  }

  updateProduct(id: number, title: string, price: number) {
    return this.httpClient.put(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      {
        title: title,
        price: price,
      }
    );
  }

  getProductById(id: number): product | undefined {
    const productsArray = this.products();
    let product: product | undefined = undefined;

    for (let i = 0; i < productsArray.length; i++) {
      if (productsArray[i].id === id) {
        product = productsArray[i];
        break;
      }
    }
    return product;
  }
}
