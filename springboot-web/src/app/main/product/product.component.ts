import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { CommonService } from 'src/app/service/common.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public ADD = 'ADD';
  public UPDATE = 'UPDATE';
  public DELETE = 'DELETE';
  public TAGNAME = 'ALL'
  public ORDER = 'ORDER';
  public NUMBER = 'NUMBER';
  public PERCENT = 'PERCENT';
  public FOOD = 'FOOD';
  public SERVICE = 'SERVICE';
  public ALL = 'ALL';
  public DISCOUNT = 'DISCOUNT';
  private OPEN_TIME = 'OPEN_TIME';
  private CLOSE_TIME = 'CLOSE_TIME';

  public productsList: any[] = [];
  public productsListBk: any[] = [];
  public listMenu: any;
  public productInput: any;
  public selectedProduct: any;

  public sortOptions: SelectItem[];
  public sortKey = 1;

  public isShowConfirm = false;
  public isShowDialog = false;
  public isShowConfirmOpenTime = false;
  public isStoreOpen = true;
  public stateOfDialog: any;

  public urlDefault = '';
  public openTime = 0;
  public closeTime = 0;

  constructor(
    public commonService: CommonService,
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService,
    private categoryService: CategoryService
  ) {
    this.urlDefault = '/assets/img/no-image.jpg';
    this.sortOptions = [
      { label: 'Giá Cao đến Thấp', value: 1 },
      { label: 'Giá Thấp đến Cao', value: -1 }
    ];
  }

  ngOnInit(): void {
    this.checkOpenTime();
    this.getProducts();
    this.getCategories();
  }

  private checkOpenTime() {
    this.commonService.getParameters().subscribe({
      next: res => {
        res.filter((val: any) => {
          if (val.parameterKey == this.OPEN_TIME) {
            this.openTime = val.parameterValue;
          }

          if (val.parameterKey == this.CLOSE_TIME) {
            this.closeTime = val.parameterValue;
          }
        });

        const today = new Date();
        const hour = today.getHours();

        if (hour < this.openTime || hour > this.closeTime) {
          this.isShowConfirmOpenTime = true;
          this.isStoreOpen = false;
        }
      }
    })
  }

  private getProducts(): void {
    const param = {
      type: this.FOOD,
      delete: false
    }

    this.productService.getProductsByTypeAndIsDelete(param).subscribe(response => {
      this.productsList = response;
      this.sortProductList();
      // create backup data
      this.productsListBk = this.productsList;
    });
  }

  private getCategories() {
    this.categoryService.getCategoriesFood().subscribe(response => {
      this.listMenu = response;
    });
  }

  public buttonHandle(event: any, product: any): void {
    switch (event) {
      case this.ORDER:
        this.cartService.addItem(
          { id: product.id, product: product, name: product.productName, price: product.finalPrice, qty: 1 }
        );
        break;

      case this.UPDATE:
        this.stateOfDialog = this.UPDATE;
        this.productService.getProductById(product.id).subscribe(response => {
          this.productInput = response;
          this.isShowDialog = true;
        });
        break;

      case this.DELETE:
        this.isShowConfirm = true;
        this.selectedProduct = product;
        break;
    }
  }

  public sortProductList(): void {
    if (this.sortKey == 1) {
      // giảm dần
      this.productsList.sort((a, b) => b.finalPrice - a.finalPrice);
    } else {
      // tăng dần
      this.productsList.sort((a, b) => a.finalPrice - b.finalPrice);
    }
  }

  public resultIsDelete(data: boolean) {
    if (data) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe(response => {
        this.messageService.add({ severity: 'success', detail: 'Xóa sản phẩm thành công', summary: 'Thành công', life: 1500 });
        this.getProducts();
      });
    }
    this.isShowConfirm = false;
  }

  public onSearch(event: any) {
    let value = this.commonService.fixTiengViet(event.target.value);
    if (value != '') {
      this.productsList = this.getProductsByName(value);
    } else {
      this.productsList = this.productsListBk;
    }
  }

  private getProductsByName(value: string): any[] {
    let result = this.productsListBk.filter(item => {
      return this.commonService.fixTiengViet(item.productName).search(value) != -1;
    });
    return result;
  }

  private getProductsByCategory(value: string): any[] {
    let result = this.productsListBk.filter(item => {
      return this.commonService.fixTiengViet(item.category).search(value) != -1;
    });
    return result;
  }

  private getProductsByDiscount(): any[] {
    let result = this.productsListBk.filter(item => {
      return item.discount == true;
    });
    return result;
  }

  public getTagName(event: any) {
    let value = this.commonService.fixTiengViet(event);
    switch (event) {
      case this.ALL:
        this.productsList = this.productsListBk;
        break;

      case this.DISCOUNT:
        this.productsList = this.getProductsByDiscount();
        break;

      default:
        this.productsList = this.getProductsByCategory(value);
        break;
    }
    this.sortProductList();
  }

  public afterExecuted() {
    this.productInput = null;
    this.isShowDialog = false;
    this.getProducts();
    this.getCategories();
  }

  public afterHide() {
    this.productInput = null;
    this.isShowDialog = false;
  }
}
