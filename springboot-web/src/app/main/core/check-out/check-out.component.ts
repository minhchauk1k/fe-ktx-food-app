import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddressService } from 'src/app/service/address.service';
import { CartService } from 'src/app/service/cart.service';
import { CommonService } from 'src/app/service/common.service';
import { MomoService } from 'src/app/service/momo.service';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';

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
  public USER_CONST = 'USER';
  public SYSTEM = 'SYSTEM';

  public paymentList: any[] = [];
  public columns: any[] = [];
  public groupName: any[] = [];
  public addressesList: any[] = [];
  public addressAreaName: any[] = [];
  public addressZoneName: any[] = [];
  public addressTypeList: any[] = [];
  public addressUserNameList: any[] = [];

  public showConfirm = false;
  public isShowAddressDialog = false;
  public addressType = true;
  public showConfirmAddress = false;
  public isShowMomoPayDialog = false;

  public user: any;
  public area: any;
  public zone: any;
  public room: any;
  public addressFull: any;

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
    private commonService: CommonService,
    private addressService: AddressService,
    private userService: UserService,
    private momoService: MomoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

    this.addressTypeList = [{ label: 'Địa chỉ đã có', value: true }, { label: 'Tạo địa chỉ mới', value: false }];
  }

  ngOnInit(): void {
    this.checkOrderIsPaid();
    this.checkLogin();
  }

  checkOrderIsPaid() {
    this.activatedRoute.queryParams.subscribe({
      next: (res: any) => {
        if (Object.keys(res).length != 0) {
          if (this.momoService.verifyIPNSignatureTest(res) && res.resultCode == 0) {
            this.orderService.updateOrderMomoStatusForUser().subscribe({
              next: res => {
                this.checkCart();
              }
            })
          } else {
            this.checkCart();
          }
        } else {
          this.checkCart();
        }
      }
    })
  }

  checkCart() {
    if (this.cartService.getItemsList().length == 0) {
      this.router.navigate(['/product'])
    }
  }

  checkLogin() {
    this.commonService.isLogin.subscribe({
      next: response => {
        if (response) {
          this.getUserInfo()
        }
      },
    })
  }

  getUserInfo() {
    this.commonService.user.subscribe({
      next: response => {
        if (response) {
          this.user = response;
          this.setInitFormValue();
        }
      },
      error: this.commonService.erorrHandle()
    });
  }

  setInitFormValue() {
    this.checkoutForm.patchValue({
      userDisplayName: this.user ? this.user.displayName : '',
      phoneNumber: this.user ? this.user.phoneNumber : '',
      address: this.getAddressFromUser(),
      createUser: this.user ? this.user.userName : '',
    });
  }

  getAddressFromUser(): string {
    let address = ''
    this.user.addresses.forEach((val: any) => {
      if (val.default) {
        address += val.area;
        address += ', ' + val.zone;
        address += ', ' + val.room;
      }
    })
    return address;
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
      value.paid = false;
      value.orderStatus = this.WAITFORPAY;

      this.orderService.addOrder(value).subscribe({
        next: response => {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đặt hàng thành công' });
          this.checkoutForm.reset();
          this.cartService.clearItems();

          // check yêu cầu thanh toán momo
          if (value.payType == this.MOMO) {
            this.momoService.momoPaymentTest(value.totalAmount).subscribe({
              next: res => {
                window.open(res.payUrl, '_self');
              },
              error: this.commonService.erorrHandle()
            });
          } else {
            this.router.navigate(['/product']);
          }
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

  private getAddresses(): void {
    this.addressesList = [];
    this.addressService.getByType(this.SYSTEM).subscribe({
      next: response => {
        this.addressesList = response;
        this.groupName = this.groupBy(this.addressesList, 'area');
        this.createDropdownName();
      },
      error: this.commonService.erorrHandle()
    })
  }

  public checkNumber(event: any): void {
    //only number will be add
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  changeAddress() {
    this.addressFull = null
    this.getAddresses();
    this.createAddressUserNameList();
    this.isShowAddressDialog = true
  }

  createAddressUserNameList() {
    this.addressUserNameList = [];
    this.user.addresses.forEach((val: any) => {
      let temp = val.area + ', ' + val.zone + ', ' + val.room;
      this.addressUserNameList.push({ label: temp, value: val });
    })
  }

  getAddressZoneName() {
    this.zone = null;
    this.addressZoneName = [];

    const key = this.area;
    this.groupName[key].forEach((element: any) => {
      this.addressZoneName.push({ label: element.zone, value: element.zone })
    });
  }

  private groupBy = (items: any[], key: string) => {
    return items.reduce((item, properties) => {
      (item[properties[key]] = item[properties[key]] || []).push(properties);
      return item;
    }, {});
  };

  private createDropdownName() {
    this.addressAreaName = [];
    for (let item in this.groupName) {
      this.addressAreaName.push({ label: item, value: item })
    }
  }

  clearCreateNew() {
    if (this.addressType) {
      this.area = null;
      this.zone = null;
      this.room = null;
    } else {
      this.addressFull = null;
    }
  }

  selectAddress() {
    this.showConfirmAddress = true;
  }

  resulthandleAddress(data: boolean) {
    if (data) {
      if (this.addressType) {
        // set tất cả đều không phải default
        this.user.addresses.forEach((val: any) => {
          val.default = false;

          if (val.id == this.addressFull.id) {
            val.default = true;
          }
        });
      } else {
        // set tất cả đều không phải default
        this.user.addresses.forEach((val: any) => {
          val.default = false;
        });

        this.user.addresses.push({
          area: this.area,
          zone: this.zone,
          room: this.room,
          type: this.USER_CONST,
          default: true
        });
      }

      this.userService.updateUser(this.user).subscribe({
        next: res => {

          if (this.addressType) {
            this.checkoutForm.patchValue({ address: this.addressFull.area + ', ' + this.addressFull.zone + ', ' + this.addressFull.room });
          } else {
            this.checkoutForm.patchValue({ address: this.area + ', ' + this.zone + ', ' + this.room });
          }

          this.isShowAddressDialog = false;
          this.showConfirmAddress = false;
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật địa chỉ thành công' });
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Xảy ra lỗi', detail: 'Cập nhật địa chỉ thất bại' });
        }
      });
    } else {
      if (this.addressType) {
        this.checkoutForm.patchValue({ address: this.addressFull.area + ', ' + this.addressFull.zone + ', ' + this.addressFull.room });
      } else {
        this.checkoutForm.patchValue({ address: this.area + ', ' + this.zone + ', ' + this.room });
      }

      this.isShowAddressDialog = false;
      this.showConfirmAddress = false;
    }
  }
}
