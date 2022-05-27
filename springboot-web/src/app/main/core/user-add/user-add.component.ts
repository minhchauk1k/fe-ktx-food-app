import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressService } from 'src/app/service/address.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  addressesList: any[] = [];

  public checkoutForm = this.formBuilder.group({
    displayName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private addressService: AddressService,
  ) { }

  ngOnInit(): void {
    this. getAddresses();
  }

  private getAddresses(): void {
    this.addressService.getAddresses().subscribe({
      next: res => {
        this.addressesList = res;
      },
      error: this.commonService.erorrHandle()
    })
  }

  onSubmit() {

  }

}
