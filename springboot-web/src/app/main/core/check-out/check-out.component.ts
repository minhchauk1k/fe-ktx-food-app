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
  public CHECKOUT = 'CHECKOUT';

  public paymentList: any[] = [];
  public columns: any[] = [];

  public showConfirm = false;
  isLogin = false;
  user: any;

  public checkoutForm = this.formBuilder.group({
    userDisplayName: '',
    // phoneNumber: ['', [Validators.required,]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9 ]*$'), Validators.minLength(10), Validators.maxLength(13)]],
    address: ['', [Validators.required]],
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
    this.checkLogin();
  }

  checkLogin() {
    this.commonService.isLogin.subscribe({
      next: response => {
        this.isLogin = response;
        if (response) {
          this.getUserInfo()
        }
      },
      error: this.commonService.erorrHandle()
    })
  }

  getUserInfo() {
    this.commonService.user.subscribe({
      next: response => {
        this.user = response;
        this.setInitFormValue();
      },
      error: this.commonService.erorrHandle()
    });
  }

  setInitFormValue() {
    this.checkoutForm.patchValue({
      userDisplayName: this.user ? this.user.displayName : '',
      phoneNumber: this.user ? this.user.phoneNumber : '',
      address: this.user ? this.user.address : '',
      createUser: this.user ? this.user.userName : '',
    });
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

  // public checkNumber(event: any): void {
  //   // nhập từ 0 -> 9
  //   if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
  //     event.preventDefault();
  //   }
  // }

  public checkNumber(event: any): void {
    //only number will be add
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
