import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from '../../app.routes';
import { item } from '../../models/models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productService = inject(ProductService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  formMode!: FormMode;
  private id!: number;

  // Defining the form with controls and their types
  form = new FormGroup({
    title: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    price: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0)],
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    categoryId: new FormControl<number>(2, {
      validators: [Validators.required],
    }),
    imageUrl: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    // Using snapshot to get the mode from route data
    this.formMode = this.activatedRoute.snapshot.data['mode'];

    if (this.formMode === FormMode.AddMode) {
      console.log('hey, I am in Add Mode');
      this.formMode = FormMode.AddMode;
    } else {
      console.log('hey, I am in Update Mode');
      this.formMode = FormMode.updateMode;
      this.form.get('description')?.disable();
      this.form.get('categoryId')?.disable();
      this.form.get('imageUrl')?.disable();
      // Fetch the existing product details to populate the form
      this.loadProduct();
    }
  }

  // Load existing product details if in update mode
  private loadProduct(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id) {
      let product = this.productService.getProductById(this.id);
      if (product) {
        // Patch the form with product details
        this.form.patchValue({
          title: product.title,
          price: product.price,
          description: product.description,
          categoryId: product.category.id,
          imageUrl: product.images[0],
        });

        // Now disable the specific fields
        this.form.get('description')?.disable();
        this.form.get('categoryId')?.disable();
        this.form.get('imageUrl')?.disable();
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const item: item = {
        title: this.form.value.title!,
        price: this.form.value.price!,
        description: this.form.value.description!,
        categoryId: this.form.value.categoryId!,
        images: [this.form.value.imageUrl!],
      };

      if (this.formMode === FormMode.AddMode) {
        this.productService.addProduct(item).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        // Update the product
        this.productService
          .updateProduct(
            this.id,
            this.form.value.title!,
            this.form.value.price!
          )
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      }
    }
  }
}
