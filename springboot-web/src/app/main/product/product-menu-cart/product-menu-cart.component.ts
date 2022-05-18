import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-menu-cart',
  templateUrl: './product-menu-cart.component.html',
  styleUrls: ['./product-menu-cart.component.css']
})
export class ProductMenuCartComponent implements OnInit {
  public columns: any[] = [];

  constructor(
    public cartService: CartService
  ) {
    this.columns = [
      { field: 'name', header: 'Tên sản phẩm' },
      { field: 'price', header: 'Giá' },
      { field: 'qty', header: 'Số lượng' }
    ];
  }

  ngOnInit(): void {
  }

  getTotalMoney() {
    let sum = 0;
    this.cartService.getItemsList().forEach(val => {
      sum += val.price;
    });
    return sum;
  }

  getTotalQty() {
    let sum = 0;
    this.cartService.getItemsList().forEach(val => {
      sum += val.qty;
    });
    return sum;
  }
}
