import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { AddressService } from 'src/app/service/address.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit {

  columnsName: any[] = [];
  addressesList: any[] = [];
  addressName: any[] = [];

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
    this.addressService.getAddresses().subscribe({
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

    temp.forEach((val: any) => {
      this.addressName.push({ label: val, value: val })
    })
  }

  onSubmit() {
    this.addressService.addAddress(this.checkoutForm.value).subscribe({
      next: response => {
        this.messageService.add({ severity: 'success', summary: 'Thêm địa chỉ thành công', life: 1500 });
        // reset lại dãy phòng/tầng
        this.checkoutForm.reset();
        this.getAddresses();
      },
      error: this.commonService.erorrHandle()
    })
  }

}
