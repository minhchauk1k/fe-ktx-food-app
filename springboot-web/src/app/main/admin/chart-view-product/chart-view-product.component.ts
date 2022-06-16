import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-view-product',
  templateUrl: './chart-view-product.component.html',
  styleUrls: ['./chart-view-product.component.css']
})
export class ChartViewProductComponent implements OnInit {

  productList: any[] = [];
  columnsName: any[] = [];

  @Input() orderListWeek: any[] = [];

  constructor() {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'productName', header: 'Tên sản phẩm', headerClass: 'text-center', class: '' },
      { field: 'total', header: 'Số lượng đã bán', headerClass: 'text-center', class: 'text-center' },
    ];
  }

  ngOnInit(): void {
    this.createProductData();
  }

  createProductData() {
    let list: any[] = [];
    let name: any[] = [];
    this.orderListWeek.forEach((data: any) => {
      data.forEach((val: any) => {
        val.details.forEach((product: any) => {
          if (!name.includes(product.product.productName)) {
            name.push(product.product.productName);
            list.push({ productName: product.product.productName, total: product.qty })
          } else {
            list.forEach((item: any) => {
              if (item.productName == product.product.productName) {
                item.total += product.qty;
              }
            })
          }
        });
      });
    });
    // sort tổng số lượng giảm dần
    list.sort((a: any, b: any) => b.total - a.total);
    // get top 5
    this.productList = list.slice(0, 5);
  }

}
