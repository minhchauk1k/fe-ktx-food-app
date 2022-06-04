import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { AddressService } from 'src/app/service/address.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  columnsName: any[] = [];
  addressesList: any[] = [];
  addressName: any[] = [];
  SYSTEM = 'SYSTEM';

  public checkoutForm = this.formBuilder.group({
    area: [null, [Validators.required]],
    zone: [null, [Validators.required]],
  });

  constructor(
    private addressService: AddressService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'area', header: 'Khu vực', headerClass: 'text-center', class: 'text-center' },
      { field: 'zone', header: 'Số tầng/Dãy phòng', headerClass: 'text-center', class: 'text-center' },
    ];
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses() {
    this.addressesList = [];
    this.addressService.getByType(this.SYSTEM).subscribe({
      next: response => {
        this.addressesList = response;
        this.createDropdownName(response);
      },
      error: this.commonService.erorrHandle()
    });
  }

  createDropdownName(data: any) {
    let temp: any = [];
    data.forEach((val: any) => {
      temp.push(val.area);
    });
    temp = new Set(temp);
    
    this.addressName = [];
    temp.forEach((val: any) => {
      this.addressName.push({ label: val, value: val })
    })
  }

  onSubmit() {
    let value = this.checkoutForm.value;
    value.type = this.SYSTEM;
    this.addressService.addAddress(this.checkoutForm.value).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm địa chỉ thành công' });
        // reset lại dãy phòng/tầng
        this.checkoutForm.reset();
        this.getAddresses();
      },
      error: this.commonService.erorrHandle()
    })
  }

}