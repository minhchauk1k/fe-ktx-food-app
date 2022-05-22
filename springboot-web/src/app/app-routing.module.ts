import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { ProductComponent } from './main/product/product.component';
import { ServiceComponent } from './main/service/service.component';
import { AboutComponent } from './main/about/about.component';
import { ProductAddComponent } from './main/core/product-add/product-add.component';
import { CheckOutComponent } from './main/core/check-out/check-out.component';
import { OrderComponent } from './main/order/order.component';
import { AdminComponent } from './main/admin/admin.component';
import { ProductListComponent } from './main/product/product-list/product-list.component';
import { ServiceListComponent } from './main/service/service-list/service-list.component';
import { UserListComponent } from './main/admin/user-list/user-list.component';
import { OrderListComponent } from './main/admin/order-list/order-list.component';
import { RoleListComponent } from './main/admin/role-list/role-list.component';
import { OrderManagementComponent } from './main/admin/order-list/order-management/order-management.component';

const routes: Routes = [
  // { path: '',   redirectTo: '', pathMatch: 'full' },
  { path: '', component: ProductComponent },
  { path: 'product', component: ProductComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'about', component: AboutComponent },
  { path: 'product-add', component: ProductAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'service-list', component: ServiceListComponent },
  { path: 'user-list', component:  UserListComponent},
  { path: 'order-list', component:  OrderListComponent},
  { path: 'order-management', component:  OrderManagementComponent},
  { path: 'role-list', component:  RoleListComponent},
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
