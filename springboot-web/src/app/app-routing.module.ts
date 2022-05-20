import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { ProductComponent } from './main/product/product.component';
import { ServiceComponent } from './main/service/service.component';
import { AboutComponent } from './main/about/about.component';
import { ProductAddComponent } from './main/core/product-add/product-add.component';
import { CheckOutComponent } from './main/core/check-out/check-out.component';

const routes: Routes = [
  // { path: '',   redirectTo: '', pathMatch: 'full' },
  { path: '', component: ProductComponent },
  { path: 'product', component: ProductComponent},
  { path: 'service', component: ServiceComponent},
  { path: 'about', component: AboutComponent},
  { path: 'product/add', component: ProductAddComponent},
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckOutComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
