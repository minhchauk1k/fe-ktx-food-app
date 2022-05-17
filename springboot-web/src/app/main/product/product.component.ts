import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
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

  public productsList: any[] = [];
  public productsListBk: any[] = [];
  public listMenu: any;

  public sortOrder: number = 1;
  public sortOptions: SelectItem[];
  public sortField: string = '';
  public sortKey: any;

  // @ViewChild('dv', { static: true }) dv: any;

  constructor(
    private productService: ProductService,
    private commonService: CommonService
  ) {
    this.sortOptions = [
      { label: 'Giá Cao đến Thấp', value: '!price' },
      { label: 'Giá Thấp đến Cao', value: 'price' }
    ];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(response => {
      this.productsList = response;
      // create back-up data
      this.productsListBk = response;
      this.createListMenu();
    });
  }

  createListMenu() {
    this.listMenu = new Set(this.productsList.map(item => item.category));
  }

  // public clickButtonHandle(event: any): void {
  //   switch (event) {
  //     case this.ADD:
  //       this.state = this.ADD;
  //       this.isShowDialog = true;
  //       break;
  //     case this.UPDATE:
  //       this.state = this.UPDATE;
  //       this.isShowDialog = true;
  //       break;
  //     case this.DELETE:
  //       this.state = this.DELETE;
  //       this.isShowDialog = true;
  //       break;
  //   }
  // }

  // public getHeaderDialog(): string {
  //   return 'Đây là header';
  // }

  onSortChange(event: any) {
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

  onSearch(event: any) {
    let value = this.commonService.fixTiengViet(event.target.value);
    if (value != '') {
      this.productsList = this.getProductsByName(value);
    } else {
      this.productsList = this.productsListBk;
    }
  }

  getProductsByName(value: string): any[] {
    let result = this.productsListBk.filter(item => {
      return this.commonService.fixTiengViet(item.productName).search(value) != -1;
    });
    return result;
  }

  getProductsByCategory(value: string): any[] {
    let result = this.productsListBk.filter(item => {
      return this.commonService.fixTiengViet(item.category).search(value) != -1;
    });
    return result;
  }

  getTagName(event: any) {
    let value = this.commonService.fixTiengViet(event);
    if (event == 'ALL') {
      this.productsList = this.productsListBk;
    } else if (event != '') {
      this.productsList = this.getProductsByCategory(value);
    }
  }
}
