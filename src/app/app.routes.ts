import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { productGuard } from './shared/guards/product-guard.guard';

export enum FormMode {
  AddMode,
  updateMode,
}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'update/:id',
    component: ProductFormComponent,
    data: { mode: FormMode.updateMode },
    canActivate: [productGuard]
  },
  {
    path: 'add',
    component: ProductFormComponent,
    data: { mode: FormMode.AddMode },
    canActivate:[productGuard]
  },
];
