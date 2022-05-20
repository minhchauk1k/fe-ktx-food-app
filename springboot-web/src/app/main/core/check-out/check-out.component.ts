import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  public MONEY = 'MONEY';
  public MOMO = 'MOMO'

  public paymentList: any[] = [];
  public columns: any[] = [];

  public checkoutForm = this.formBuilder.group({
    phoneNumber: null,
    addresss: '',
    productCode: '',
    note: '',
    payType: this.MONEY
  });

  constructor(
    private formBuilder: FormBuilder,
    public cartService: CartService,
    ) {
    this.paymentList = [
      { label: 'Bằng tiền mặt', value: this.MONEY },
      { label: 'Ví điện tử Momo', value: this.MOMO }
    ];
    
    this.columns = [
      { field: 'name', header: 'Tên sản phẩm' },
      { field: 'price', header: 'Giá' },
      { field: 'qty', header: 'Số lượng' }
    ];
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }

  getTotalMoney(): number {
    let sum = 0;
    this.cartService.getItemsList().forEach(val => {
      sum += val.price * val.qty;
    });
    return sum;
  }

  getTotalQty(): number {
    let sum = 0;
    this.cartService.getItemsList().forEach(val => {
      sum += val.qty;
    });
    return sum;
  }

}
