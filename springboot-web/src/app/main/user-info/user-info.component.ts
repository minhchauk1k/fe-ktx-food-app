import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AddressService } from 'src/app/service/address.service';
import { CommonService } from 'src/app/service/common.service';
import { DateService } from 'src/app/service/date.service';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  COMPLETED = 'COMPLETED';
  CANCEL = 'CANCEL';
  SYSTEM = 'SYSTEM';
  USER_CONST = 'USER';

  items: MenuItem[] = [];
  columnNameHistory: any[] = [];
  columnNameAddress: any[] = [];
  ordersList: any[] = [];
  statusNameList: any[] = [];
  addressesList: any[] = [];
  addressAreaName: any[] = [];
  addressZoneName: any[] = [];
  groupName: any[] = [];

  activeItem: number = 0;

  statusSelected: any = '';
  dateFrom: any;
  dateTo: any;
  user: any;
  area: any;
  zone: any;
  room: any;

  isShowAddressDialog = false;

  constructor(
    private orderSevice: OrderService,
    private commonService: CommonService,
    private dateService: DateService,
    private userService: UserService,
    private messageService: MessageService,
    private addressService: AddressService,
  ) {
    this.items = [
      { label: 'Lịch sử đơn hàng', command: () => { this.activeItem = 0 } },
      { label: 'Thông tin tài khoản', command: () => { this.activeItem = 1 } },
    ];

    this.columnNameHistory = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'showDetails', header: 'Chi tiết', headerClass: 'text-center', class: 'text-center' },
      { field: 'orderCode', header: 'Mã đơn hàng', headerClass: 'text-center', class: 'text-center' },
      { field: 'time', header: 'Thời gian', headerClass: 'text-center', class: 'text-center' },
      { field: 'address', header: 'Địa chỉ', headerClass: 'text-center', class: 'text-center' },
      { field: 'shipper', header: 'Nhân viên giao hàng', headerClass: 'text-center', class: 'text-center' },
      { field: 'totalAmount', header: 'Tổng tiền', headerClass: 'text-center', class: 'text-center' },
      { field: 'status', header: 'Trạng thái', headerClass: 'text-center', class: 'text-center' },
    ];

    this.columnNameAddress = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'area', header: 'Khu vực', headerClass: 'text-center', class: 'text-center' },
      { field: 'zone', header: 'Dãy phòng/Số tầng', headerClass: 'text-center', class: 'text-center' },
      { field: 'room', header: 'Phòng', headerClass: 'text-center', class: 'text-center' },
      { field: 'default', header: 'Mặc định', headerClass: 'text-center', class: 'text-center' },
      { field: 'button', header: '', headerClass: 'text-center', class: 'text-center' },
    ];

    this.statusNameList = [
      { label: 'Tất cả', value: '' },
      { label: 'Hoàn thành', value: this.COMPLETED },
      { label: 'Đã hủy', value: this.CANCEL },
    ];

    let temp = new Date();
    this.dateTo = temp;
    this.dateFrom = new Date(temp.getFullYear(), temp.getMonth(), temp.getDay() - 8);
  }

  ngOnInit(): void {
    this.getUser();
    this.getAddresses();
  }

  getUser() {
    this.commonService.user.subscribe({
      next: res => {
        if (res != null) {
          this.user = res
        }
      }
    })
  }

  search() {
    const param = {
      status: this.statusSelected,
      dateFrom: this.dateService.formatToSv(this.dateFrom),
      dateTo: this.dateService.formatToSv(this.dateTo)
    }

    this.orderSevice.getOrdersOfUser(param).subscribe({
      next: res => {
        this.createOrderList(res);
      },
      error: this.commonService.erorrHandle()
    })
  }

  createOrderList(data: any[]) {
    // reset 
    this.ordersList = [];

    data.forEach(val => {
      this.userService.getUserFullNameByUsername(val.updateUser).subscribe({
        next: res => {
          const orderTime = this.dateService.formatHours(val.createDate);
          const completeTime = this.dateService.formatHours(val.updateDate);
          const time = {
            orderTime: orderTime,
            completeTime: completeTime
          }
          const shipper = res.displayName;

          this.ordersList.push({
            orderCode: val.orderCode,
            time: time,
            address: val.address,
            shipper: shipper,
            totalAmount: val.totalAmount,
            status: val.orderStatus,
            details: val.details
          });
        }
      })
    })
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe({
      next: res => {
        this.user = res;
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thông tin thành công' });
      },
      error: this.commonService.erorrHandle()
    })
  }

  changeDefaultAddress(data: any) {
    this.user.addresses.forEach((val: any) => {
      if (val.id != data.id) {
        val.default = false;
      } else {
        val.default = true;
      }
    })
  }

  openAddressDialog() {
    this.isShowAddressDialog = true
  }

  getAddressZoneName() {
    this.zone = null;
    this.addressZoneName = [];

    const key = this.area;
    this.groupName[key].forEach((element: any) => {
      this.addressZoneName.push({ label: element.zone, value: element.zone })
    });
  }

  private getAddresses(): void {
    this.addressesList = [];
    this.addressService.getByType(this.SYSTEM).subscribe({
      next: response => {
        this.addressesList = response;
        this.groupName = this.addressService.groupBy(this.addressesList, 'area');
        this.createDropdownName();
      },
      error: this.commonService.erorrHandle()
    })
  }

  private createDropdownName() {
    this.addressAreaName = [];
    for (let item in this.groupName) {
      this.addressAreaName.push({ label: item, value: item })
    }
  }

  addAddress() {
    this.user.addresses.push({
      area: this.area,
      zone: this.zone,
      room: this.room,
      type: this.USER_CONST,
      default: false
    });

    this.area = null;
    this.zone = null;
    this.room = null;
    this.isShowAddressDialog = false;
  }

  deleteAddress(data: any) {
    let temp: any[] = [];
    this.user.addresses.forEach((val: any) => {
      if (val.id && val.id != data.id) {
        temp.push(val)
      }
    })

    this.user.addresses = temp;
  }

}