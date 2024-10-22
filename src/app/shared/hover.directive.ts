import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  inject,
} from '@angular/core';
import { Role } from '../models/models';
import { ProductService } from '../services/product.service';

@Directive({
  selector: '[isEligible]',
})

export class IsEligibleDirective {
  @Input() isEligible: Role = Role.user;

  private templateRef: TemplateRef<any>;
  private viewContainerRef: ViewContainerRef;
  productService = inject(ProductService);

  constructor(
    templateRef: TemplateRef<any>,
    viewContainerRef: ViewContainerRef
  ) {
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.updateView();
  }

  ngOnChanges() {
    this.updateView();
  }

  private updateView() {
    if (this.isEligible) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
