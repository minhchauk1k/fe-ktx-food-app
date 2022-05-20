import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { CartService } from 'src/app/service/cart.service';
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
  private FOOD = 'FOOD';
  private SERVICE = 'SERVICE';

  public productsList: any[] = [];
  public productsListBk: any[] = [];
  public listMenu: any;
  public productInput: any;

  public sortOrder: number = 1;
  public sortOptions: SelectItem[];
  public sortField: string = '';
  public sortKey: any;

  public isShowDialog = false;
  public stateOfDialog: any;

  constructor(
    public commonService: CommonService,
    private productService: ProductService,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.sortOptions = [
      { label: 'Giá Cao đến Thấp', value: '!price' },
      { label: 'Giá Thấp đến Cao', value: 'price' }
    ];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    const param = {
      type: this.FOOD,
      delete: false
    }

    this.productService.getProductsByTypeAndIsDelete(param).subscribe(response => {
      this.productsList = response;
      this.createFinalPrice();
      // create backup data
      this.productsListBk = this.productsList;
      this.createListMenu();
    });
  }

  private createFinalPrice() {
    this.productsList.forEach((val: any) => {
      if (val.discount) {
        switch (val.discountType) {
          case this.NUMBER:
            val.finalPrice = val.price - val.discountNumber;
            break;
          case this.PERCENT:
            val.finalPrice = val.price - val.discountPercent * val.price / 100;
            break;
        }
      } else {
        val.finalPrice = val.price;
      }
    });
  }

  private createListMenu() {
    this.listMenu = new Set(this.productsList.map((item: any) => item.category));
  }

  public clickButtonHandle(event: any, product: any): void {
    switch (event) {
      case this.ORDER:
        this.cartService.addItem(
          { id: product.id, code: product.productCode, name: product.productName, price: product.finalPrice, qty: 1 }
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
        this.confirmationService.confirm({
          message: 'Bạn có muốn xóa sản phẩm này hay không?',
          accept: () => {
            this.productService.deleteProduct(product.id).subscribe(response => {
              this.messageService.add({ severity: 'success', summary: 'Xóa sản phẩm thành công', life: 1500 });
              this.getProducts();
            });
          }
        });
        break;
    }
  }

  public onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
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
      case 'ALL':
        this.productsList = this.productsListBk;
        break;

      case 'DISCOUNT':
        this.productsList = this.getProductsByDiscount();
        break;

      default:
        this.productsList = this.getProductsByCategory(value);
        break;
    }
  }

  public clearDataInput() {
    this.productInput = null;
  }
}
