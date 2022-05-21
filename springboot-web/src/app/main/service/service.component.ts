import { Component, OnInit } from '@angular/core';
import { SelectItem, ConfirmationService, MessageService } from 'primeng/api';
import { CartService } from 'src/app/service/cart.service';
import { CommonService } from 'src/app/service/common.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
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

  public urlAvatarDisplay = '';

  constructor(
    public commonService: CommonService,
    private productService: ProductService,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.urlAvatarDisplay = '/assets/img/no-image.jpg';
    this.sortOptions = [
      { label: 'Giá Cao đến Thấp', value: '!price' },
      { label: 'Giá Thấp đến Cao', value: 'price' }
    ];
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategorys();
  }

  private getProducts(): void {
    const param = {
      type: this.SERVICE,
      delete: false
    }

    this.productService.getProductsByTypeAndIsDelete(param).subscribe(response => {
      this.productsList = response;
      // create back-up data
      this.productsListBk = this.productsList;
    });
  }

  private getCategorys() {
    this.productService.getCategorysService().subscribe(response => {
      this.listMenu = response;
    });
  }

  public clickButtonHandle(event: any, product: any): void {
    switch (event) {
      case this.ORDER:
        this.cartService.addItem(
          { product: product, name: product.productName, price: product.finalPrice, qty: 1 }
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
              this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm sản phẩm thành công' });
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
  }

  public afterExecuted() {
    this.productInput = null;
    this.isShowDialog = false;
    this.getProducts();
    this.getCategorys();
  }
}
