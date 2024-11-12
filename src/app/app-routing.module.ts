import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrdenComponent } from './orden/orden.component';
import { ReportActiveProductsComponent } from './report-active-products/report-active-products.component';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'mis-ordenes', component: OrdenComponent },
  { path: 'reporte-productos-activos', component: ReportActiveProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }