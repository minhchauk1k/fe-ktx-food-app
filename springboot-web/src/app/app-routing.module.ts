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
import { OrderDeliveryComponent } from './main/admin/order-list/order-delivery/order-delivery.component';
import { OrderDeliveryLotComponent } from './main/admin/order-list/order-delivery-lot/order-delivery-lot.component';
import { UserAddComponent } from './main/core/user-add/user-add.component';
import { AddressListComponent } from './main/admin/system-list/address-list/address-list.component';
import { UserInfoComponent } from './main/user-info/user-info.component';
import { OrderManagementLotComponent } from './main/admin/order-list/order-management-lot/order-management-lot.component';
import { ParameterListComponent } from './main/admin/system-list/parameter-list/parameter-list.component';
import { CategoryListComponent } from './main/admin/category-list/category-list.component';

const routes: Routes = [
  // { path: '',   redirectTo: '', pathMatch: 'full' },
  { path: '', component: ProductComponent },
  { path: 'product', component: ProductComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'about', component: AboutComponent },
  { path: 'product-add', component: ProductAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: UserAddComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'service-list', component: ServiceListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-management', component: OrderManagementComponent },
  { path: 'order-management-lot', component: OrderManagementLotComponent },
  { path: 'order-delivery', component: OrderDeliveryComponent },
  { path: 'order-delivery-lot', component: OrderDeliveryLotComponent },
  { path: 'role-list', component: RoleListComponent },
  { path: 'address-list', component: AddressListComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'parameter-list', component: ParameterListComponent },
  { path: 'category-list', component: CategoryListComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
