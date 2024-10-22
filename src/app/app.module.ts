import { provideHttpClient } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideRouter, RouterLink, RouterOutlet, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { ProductService } from "./services/product.service";
import { routes } from "./app.routes";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProductComponent } from "./components/product/product.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from "./components/home/home.component";
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { DataPipe } from "./shared/data.pipe";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from "primeng/api";
import { IsEligibleDirective } from "./shared/hover.directive";

@NgModule({
  declarations: [
  AppComponent,
  NavbarComponent,
  ProductComponent,
  ProductListComponent,
  ProductFormComponent,
  HomeComponent,
  DataPipe,
  IsEligibleDirective
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    provideHttpClient(),
    ProductService,
    provideRouter(routes, withComponentInputBinding(),),
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
