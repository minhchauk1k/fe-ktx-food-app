import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-menu-cart',
  templateUrl: './menu-cart.component.html',
  styleUrls: ['./menu-cart.component.scss']
})
export class MenuCartComponent implements OnInit {

  CHECKOUT = 'CHECKOUT';

  public columnsName: any[] = [];

  isShowConfirm = false;

  @Input() controlName: any

  constructor(
    public cartService: CartService,
    private router: Router,
    private commonService: CommonService,
  ) {
    this.columnsName = [
      { field: 'name', header: 'Tên sản phẩm', headerClass: 'text-center', class: '' },
      { field: 'price', header: 'Giá', headerClass: 'text-center', class: '' },
      { field: 'qty', header: 'Số lượng', headerClass: 'text-center', class: 'text-center' }
    ];
  }

  ngOnInit(): void {
  }

  getTotalMoney() {
    let sum = 0;
    this.cartService.getItemsList().forEach(val => {
      sum += val.price * val.qty;
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

  minusCheck(item: any) {
    item.qty -= 1;
    if (item.qty == 0) {
      this.cartService.clearItemById(item.id);
    }
  }

  plusCheck(item: any) {
    item.qty += 1;
  }

  checkOut() {
    this.commonService.isLogin.subscribe({
      next: response => {
        if (!response) {
          this.isShowConfirm = true;
        } else {
          this.router.navigate(["/checkout"]);
        }
      }
    })
  }

  resultHandle(data: boolean) {
    if (data) {
      this.router.navigate(["/login"]);
    }
    this.isShowConfirm = false;
  }

  buyAgain() {
    this.router.navigate(["/product"]);
  }

  clearItem() {
    this.cartService.clearItems();
    this.router.navigate(["/product"]);
  }
}
