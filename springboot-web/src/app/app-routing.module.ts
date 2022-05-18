import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuDashboardComponent } from './main/menu-dashboard/menu-dashboard.component';
import { LoginComponent } from './main/login/login.component';
import { ProductAddComponent } from './main/product/product-add/product-add.component';
import { ProductComponent } from './main/product/product.component';
import { ServiceComponent } from './main/service/service.component';
import { AboutComponent } from './main/about/about.component';

const routes: Routes = [
  // { path: '',   redirectTo: '', pathMatch: 'full' },
  { path: '', component: ProductComponent },
  { path: 'product', component: ProductComponent},
  { path: 'service', component: ServiceComponent},
  { path: 'about', component: AboutComponent},
  { path: 'product/add', component: ProductAddComponent},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: MenuDashboardComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
