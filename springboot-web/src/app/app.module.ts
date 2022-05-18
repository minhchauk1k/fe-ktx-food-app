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
import { HeaderComponent } from './main/header/header.component';
import { ProductDialogComponent } from './main/product/product-dialog/product-dialog.component';
import { MenuHeaderComponent } from './main/menu-header/menu-header.component';
import { LoginComponent } from './main/login/login.component';
import { ProductItemComponent } from './main/product/product-item/product-item.component';
import { ProductAddComponent } from './main/product/product-add/product-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductMenuCategoryComponent } from './main/product/product-menu-category/product-menu-category.component';
import { MenuDashboardComponent } from './main/menu-dashboard/menu-dashboard.component';
import { ServiceComponent } from './main/service/service.component';
import { AboutComponent } from './main/about/about.component';
import { ProductMenuCartComponent } from './main/product/product-menu-cart/product-menu-cart.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HeaderComponent,
    ProductDialogComponent,
    MenuHeaderComponent,
    LoginComponent,
    ProductItemComponent,
    MenuDashboardComponent,
    ProductAddComponent,
    ProductMenuCategoryComponent,
    ServiceComponent,
    AboutComponent,
    ProductMenuCartComponent
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
