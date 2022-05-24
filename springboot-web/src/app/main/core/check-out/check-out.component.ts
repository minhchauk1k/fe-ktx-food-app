import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/service/cart.service';
import { CommonService } from 'src/app/service/common.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  public MONEY = 'MONEY';
  public MOMO = 'MOMO'
  public ANONYMOUS = 'ANONYMOUS';
  public WAITFORPAY = 'WAITFORPAY';
  public PAID = 'PAID';

  public paymentList: any[] = [];
  public columns: any[] = [];

  public showConfirm = false;

  public checkoutForm = this.formBuilder.group({
    userDisplayName: '',
    phoneNumber: [null, Validators.required],
    address: [null, Validators.required],
    note: '',
    payType: this.MONEY,
    createUser: this.ANONYMOUS,
    createDate: new Date()
  });

  constructor(
    public cartService: CartService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private messageService: MessageService,
    private commonService: CommonService
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

  private createDetailsList() {
    let result: any = [];
    this.cartService.getItemsList().forEach(val => {
      result.push({ product: val.product, qty: val.qty });
    });
    return result;
  }

  public onSubmit(): void {
    this.showConfirm = true;

  }

  public resulthandle(data: boolean) {
    if (data) {
      let value = this.checkoutForm.value;
      value.details = this.createDetailsList();
      value.totalAmount = this.getTotalMoney();
      value.totalQty = this.getTotalQty();
      value.paid = value.payType == this.MONEY ? false : true;
      value.orderStatus = value.payType == this.MONEY ? this.WAITFORPAY : this.PAID;


      this.orderService.addOrder(value).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Đặt hàng thành công', life: 1500 });
          this.checkoutForm.reset();
          this.cartService.clearItems();
        },
        error: this.commonService.erorrHandle()
      });
    }
    this.showConfirm = false;
  }

  public getTotalMoney(): number {
    let sum = 0;
    this.cartService.getItemsList().forEach(val => {
      sum += val.price * val.qty;
    });
    return sum;
  }

  public getTotalQty(): number {
    let sum = 0;
    this.cartService.getItemsList().forEach(val => {
      sum += val.qty;
    });
    return sum;
  }

}
