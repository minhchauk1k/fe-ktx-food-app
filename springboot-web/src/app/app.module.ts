import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TabMenuModule } from 'primeng/tabmenu';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListModule } from 'primeng/orderlist';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {TableModule} from 'primeng/table';

import { ProductComponent } from './main/product/product.component';
import { LoginComponent } from './main/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceComponent } from './main/service/service.component';
import { AboutComponent } from './main/about/about.component';
import { MenuCartComponent } from './main/core/menu-cart/menu-cart.component';
import { HeaderComponent } from './main/core/header/header.component';
import { ProductAddComponent } from './main/core/product-add/product-add.component';
import { MenuCategoryComponent } from './main/core/menu-category/menu-category.component';
import { MenuDashboardComponent } from './main/core/menu-dashboard/menu-dashboard.component';
import { CheckOutComponent } from './main/core/check-out/check-out.component';
import { OrderComponent } from './main/order/order.component';
import { AdminComponent } from './main/admin/admin.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HeaderComponent,
    LoginComponent,
    MenuDashboardComponent,
    ProductAddComponent,
    MenuCategoryComponent,
    ServiceComponent,
    AboutComponent,
    MenuCartComponent,
    CheckOutComponent,
    OrderComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TabMenuModule,
    DataViewModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    OrderListModule,
    DropdownModule,
    CardModule,
    TieredMenuModule,
    ReactiveFormsModule,
    InputNumberModule,
    CheckboxModule,
    SelectButtonModule,
    CalendarModule,
    NgbModule,
    InputTextareaModule,
    ImageModule,
    RadioButtonModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
