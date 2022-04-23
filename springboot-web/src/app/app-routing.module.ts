import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { ProductComponent } from './main/product/product.component';

const routes: Routes = [
  // { path: '',   redirectTo: '', pathMatch: 'full' },
  { path: '', component: ProductComponent },
  { path: 'product', component: ProductComponent},
  { path: 'login', component: LoginComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
