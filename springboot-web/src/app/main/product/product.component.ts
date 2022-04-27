import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table'
import { Product } from 'src/app/model/product';
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

  public productsList: Product[] = [];
  public state: string = '';
  public isShowDialog: boolean = false;
  public sortOrder: number = 1;
  public sortField: string = '';
  public sortOptions: SelectItem[];
  public sortKey :any;
  @ViewChild('dt') dt: Table | undefined;
  constructor(
    private productService: ProductService
  ) {
    this.sortOptions = [
      { label: 'Giá Cao đến Thấp', value: '!price' },
      { label: 'Giá Thấp đến Cao', value: 'price' }
    ];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getAllProducts().subscribe((respone: Product[]) => {
      this.productsList = respone;
      // this.productsList.pop();
    });
  }

  public clickButtonHandle(event: any): void {
    switch (event) {
      case this.ADD:
        this.state = this.ADD;
        this.isShowDialog = true;
        break;
      case this.UPDATE:
        this.state = this.UPDATE;
        this.isShowDialog = true;
        break;
      case this.DELETE:
        this.state = this.DELETE;
        this.isShowDialog = true;
        break;
    }
  }

  public getHeaderDialog(): string {
    return 'Đây là header';
  }

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

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
