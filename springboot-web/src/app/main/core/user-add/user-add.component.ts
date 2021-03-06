import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddressService } from 'src/app/service/address.service';
import { CommonService } from 'src/app/service/common.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  addressesList: any[] = [];
  addressAreaName: any[] = [];
  addressZoneName: any[] = [];
  groupName: any[] = [];

  isShowPw = false;
  USER = 'USER';
  SYSTEM = 'SYSTEM';

  public checkoutForm = this.formBuilder.group({
    displayName: [null, [Validators.required]],
    userName: [null, [Validators.required]],
    password: [null],
    pw1: [null, [Validators.required]],
    pw2: [null, [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9 ]*$'), Validators.minLength(10), Validators.maxLength(13)]],
    address: null,
    area: [null, [Validators.required]],
    zone: [null, [Validators.required]],
    room: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private addressService: AddressService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAddresses();
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

  getAddressZoneName() {
    // reset dropdown d?????i
    this.checkoutForm.value.zone = null;
    this.addressZoneName = [];

    const key = this.checkoutForm.value.area;
    this.groupName[key].forEach((element: any) => {
      this.addressZoneName.push({ label: element.zone, value: element.zone })
    });
  }

  onSubmit() {
    let value = this.checkoutForm.value;
    value.addresses = [{
      area: value.area,
      zone: value.zone,
      room: value.room,
      type: this.USER,
      default: true
    }];

    this.userService.checkExistByUserName(value.userName).subscribe({
      next: res => {
        // check password
        if (value.pw1 !== value.pw2) {
          this.messageService.add({ severity: 'error', summary: 'Th??ng b??o', detail: 'M???t kh???u kh??ng tr??ng nhau', life: 5000 });
          this.checkoutForm.controls['pw1'].setErrors({ 'incorrect': true });
          this.checkoutForm.controls['pw2'].setErrors({ 'incorrect': true });
        } else {
          value.password = value.pw1;
        };

        // check exist
        if (res) {
          this.messageService.add({ severity: 'error', summary: 'Th??ng b??o', detail: 'T??n ????ng nh???p ???? t???n t???i', life: 5000 });
          this.checkoutForm.controls['userName'].setErrors({ 'incorrect': true });
        } else {
          this.userService.addUser(value).subscribe({
            next: res => {
              this.messageService.add({ severity: 'success', summary: 'Th??nh c??ng', detail: '????ng k?? th??nh c??ng', life: 3000 });
              this.router.navigate(['/login']);
            },
            error: this.commonService.erorrHandle()
          });
        }
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

  changeIsShowPw() {
    this.isShowPw = !this.isShowPw;
  }

}
