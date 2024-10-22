import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Role } from '../../models/models';

export const productGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const productService = inject(ProductService);

  if (productService.activeRole() === Role.user) {
    console.log('guard ');
    return router.navigate(['/']);
  } else {
    console.log('guard');
    return true;
  }
};
