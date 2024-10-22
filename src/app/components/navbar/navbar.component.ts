import { Component, inject } from '@angular/core';
import { Role } from '../../models/models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  productService = inject(ProductService);

  selectUser() {
    this.productService.activeRole.set(Role.user);
  }

  selectAdmin() {
    this.productService.activeRole.set(Role.admin);
  }
}
