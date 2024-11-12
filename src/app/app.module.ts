import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Importar FormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserService } from './services/user.service';
import { OrdenComponent } from './orden/orden.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ReportActiveProductsComponent } from './report-active-products/report-active-products.component';
import { VisibilityService } from './services/visibility.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CarouselComponent,
    ProductListComponent,
    FiltrosComponent,
    MyProfileComponent,
    OrdenComponent,
    ManageProductComponent,
    ReportActiveProductsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideAnimationsAsync(),
    UserService,
    VisibilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
