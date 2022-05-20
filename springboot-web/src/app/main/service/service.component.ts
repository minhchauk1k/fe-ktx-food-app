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
  public ORDER = 'ORDER';
  public TAGNAME = 'ALL'
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
      type: this.SERVICE,
      delete: false
    }

    this.productService.getProductsByTypeAndIsDelete(param).subscribe(response => {
      this.productsList = response;
      this.createFinalPrice();
      // create back-up data
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
    this.listMenu = new Set(this.productsList.map(item => item.category));
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

  public getTagName(event: any) {
    let value = this.commonService.fixTiengViet(event);
    if (event == 'ALL') {
      this.productsList = this.productsListBk;
    } else if (event != '') {
      this.productsList = this.getProductsByCategory(value);
    }
  }

  public clearDataInput() {
    this.productInput = null;
  }
}
