import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AddressService } from 'src/app/service/address.service';
import { CommonService } from 'src/app/service/common.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  public ORDER = 'ORDER';
  public PREPARING = 'PREPARING';
  public WAITFORPAY = 'WAITFORPAY';
  public PAID = 'PAID';
  public LOT_CONTROL = 'LOT_CONTROL';
  public YES = 'YES';
  public SYSTEM = 'SYSTEM';

  public ordersList: any[] = [];
  public ordersListBk: any[] = [];
  public ordersListCheck: any[] = [];
  public ordersListWait: any[] = [];
  public ordersListWaitBk: any[] = [];
  public ordersListDelivery: any[] = [];
  public columnsName: any[] = [];
  public statusOrderList: any[] = [];
  public items: MenuItem[] = [];

  public addressesList: any[] = [];
  public groupByAreaName: any[] = [];
  public addressAreaName: any[] = [];
  public addressZoneName1: any[] = [];
  public addressZoneName2: any[] = [];

  public isLotControl: boolean = false;
  public activeItem: boolean = true;
  public isShowFilterTable1: boolean = false;
  public isShowFilterTable2: boolean = false;

  private myTimeOut: any;

  public orderCode1: any;
  public area1: any;
  public zone1: any;
  public phoneNumber1: any;
  public status1: any;
  public orderCode2: any;
  public area2: any;
  public zone2: any;
  public phoneNumber2: any;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private commonService: CommonService,
    private addressService: AddressService,
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center my-w-45', class: 'text-center my-w-45' },
      { field: 'showDetails', header: 'Chi tiết', headerClass: 'text-center my-w-70', class: 'text-center my-w-70' },
      { field: 'orderCode', header: 'Mã đơn hàng', headerClass: 'text-center my-w-110', class: 'text-center my-w-110' },
      { field: 'address', header: 'Địa chỉ giao hàng', headerClass: 'text-center my-w-340', class: 'my-w-340 text-truncate' },
      { field: 'phoneNumber', header: 'Số điện thoại', headerClass: 'text-center my-w-130', class: 'text-center my-w-130' },
      { field: 'orderStatus', header: 'Trạng thái', headerClass: 'text-center my-w-120', class: 'text-center my-w-120' },
      { field: 'button', header: '', headerClass: 'text-center my-w-120', class: 'text-center my-w-120' },
    ];

    this.statusOrderList = [
      { label: this.PAID, value: this.PAID },
      { label: this.WAITFORPAY, value: this.WAITFORPAY },
    ];

    this.items = [
      { label: 'Đơn hàng khách đã đặt', icon: 'pi pi-fw pi-file', command: () => { this.activeItem = true } },
      { label: 'Đơn hàng đang chuẩn bị', icon: 'pi pi-fw pi-file', command: () => { this.activeItem = false } },
    ];
  }

  ngOnInit(): void {
    this.getOrdersJustPaid();
    this.getOrdersJustRepaired();
    this.getIsLotControl();
    this.getAddresses();
  }

  ngAfterViewInit(): void {
    // tạo request mỗi 1 phút
    this.myTimeOut = setInterval(() => {
      this.getOrdersJustPaidLoop();
    }, 1000 * 60);
  }

  ngOnDestroy(): void {
    clearInterval(this.myTimeOut);
  }

  private checkOrdersJustPaid() {
    const diff = JSON.stringify(this.ordersListCheck) === JSON.stringify(this.ordersList);
    if (!diff) {
      this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã cập nhật danh sách đơn hàng' });
    }
  }

  private getIsLotControl(): void {
    this.commonService.getParameter(this.LOT_CONTROL).subscribe({
      next: response => {
        this.isLotControl = (response.parameterValue === this.YES) ? true : false;
      },
      error: this.commonService.erorrHandle()
    });
  }

  private getOrdersJustPaid(): void {
    this.orderService.getOrdersJustPaid().subscribe({
      next: response => {
        this.ordersList = response;
        this.ordersListBk = this.ordersList;
      },
      error: this.commonService.erorrHandle()
    });
  }

  private getOrdersJustPaidLoop(): void {
    this.orderService.getOrdersJustPaid().subscribe({
      next: response => {
        this.ordersListCheck = this.ordersList;
        
        this.ordersList = response;
        this.ordersListBk = this.ordersList;

        this.checkOrdersJustPaid();
      },
      error: this.commonService.erorrHandle()
    });
  }

  private getOrdersJustRepaired(): void {
    this.orderService.getOrdersJustRepaired().subscribe({
      next: response => {
        this.ordersListWait = response;
        this.ordersListWaitBk = this.ordersListWait;
      },
      error: this.commonService.erorrHandle()
    });
  }

  public changeStatusOrder(order: any, statusFrom: string) {
    let statusChangeTo = '';
    switch (statusFrom) {
      case this.ORDER:
        statusChangeTo = this.PREPARING;
        break;

      case this.PREPARING:
        statusChangeTo = order.paid ? this.PAID : this.WAITFORPAY;
        break;
    }

    this.orderService.changeStatusOrder(order.id, statusChangeTo).subscribe({
      next: response => {
        switch (statusFrom) {
          case this.ORDER:
            this.deleteOrderAddWait(order.id, response);
            this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: order.orderCode + ' đang được chuẩn bị' });
            break;

          case this.PREPARING:
            this.deleteWaitAddOrder(order.id, response);
            this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: order.orderCode + ' đã hủy chuẩn bị' });
            break;
        }
      },
      error: this.commonService.erorrHandle()
    });
  }

  private deleteOrderAddWait(id: number, data: any) {
    // xóa bảng hiện tại
    this.ordersList = this.ordersList.filter(val => {
      return val.id != id;
    });
    this.ordersListBk = this.ordersListBk.filter(val => {
      return val.id != id;
    });

    // add vào bảng mới
    this.ordersListWait.push(data);
    this.ordersListWait.sort((a, b) => a.orderCode - b.orderCode);
    this.ordersListWaitBk = this.ordersListWait;
  }

  private deleteWaitAddOrder(id: number, data: any) {
    // xóa bảng hiện tại
    this.ordersListWait = this.ordersListWait.filter(val => {
      return val.id != id;
    });
    this.ordersListWaitBk = this.ordersListWaitBk.filter(val => {
      return val.id != id;
    });

    // add vào bảng mới
    this.ordersList.push(data);
    this.ordersList.sort((a, b) => a.orderCode - b.orderCode);
    this.ordersListBk = this.ordersList;
  }

  public deliveryOrders() {
    this.ordersListDelivery = this.ordersListWait;

    let idList: any[] = [];
    this.ordersListDelivery.forEach(val => {
      idList.push(val.id);
    });

    this.orderService.deliveryOrders(idList).subscribe({
      next: response => {
        this.ordersListWait = [];
        if (this.isLotControl && response != null) {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Lô ' + response.lotCode + ' đang được giao' });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đơn hàng đang được giao' });
        }
      },
      error: this.commonService.erorrHandle()
    });
  }

  private getAddresses(): void {
    // reset
    this.addressesList = [];

    this.addressService.getByType(this.SYSTEM).subscribe({
      next: response => {
        this.addressesList = response;
        this.groupByAreaName = this.addressService.groupBy(this.addressesList, 'area');
        this.createAreaNameList();
      },
      error: this.commonService.erorrHandle()
    })
  }

  public checkNumber(event: any): void {
    // only number will be add
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  private createAreaNameList() {
    // reset
    this.addressAreaName = [];

    for (let item in this.groupByAreaName) {
      this.addressAreaName.push({ label: item, value: item });
    }
  }

  public createZoneNameList1() {
    // reset
    this.zone1 = null;
    this.addressZoneName1 = [];

    this.groupByAreaName[this.area1].forEach((element: any) => {
      this.addressZoneName1.push({ label: element.zone, value: element.zone })
    });
  }

  public createZoneNameList2() {
    // reset
    this.zone2 = null;
    this.addressZoneName2 = [];

    this.groupByAreaName[this.area2].forEach((element: any) => {
      this.addressZoneName2.push({ label: element.zone, value: element.zone })
    });
  }

  public changeShowFilterTable1() {
    // bỏ search nếu đóng button
    if (this.isShowFilterTable1) {
      this.clearSearchTable1();
    }

    this.isShowFilterTable1 = !this.isShowFilterTable1;
  }

  public changeShowFilterTable2() {
    // bỏ search nếu đóng button
    if (this.isShowFilterTable2) {
      this.clearSearchTable2();
    }

    this.isShowFilterTable2 = !this.isShowFilterTable2;
  }

  public clearSearchTable1() {
    this.ordersList = this.ordersListBk;
    this.orderCode1 = null;
    this.area1 = null;
    this.zone1 = null;
    this.phoneNumber1 = null;
    this.status1 = null;
  }

  public clearSearchTable2() {
    this.ordersListWait = this.ordersListWaitBk;
    this.orderCode2 = null;
    this.area2 = null;
    this.zone2 = null;
    this.phoneNumber2 = null;
  }

  public searchTable1() {
    let result = this.ordersListBk;
    if (this.orderCode1 != '' && this.orderCode1 != null) {
      result = this.getOrdersByOrderCode(result, this.orderCode1);
    }

    if (this.area1 != null) {
      result = this.getOrdersByArea(result, this.area1);
    }

    if (this.zone1 != null) {
      result = this.getOrdersByZone(result, this.zone1);
    }

    if (this.phoneNumber1 != '' && this.phoneNumber1 != null) {
      result = this.getOrdersByPhoneNumber(result, this.phoneNumber1);
    }

    if (this.status1 != null) {
      result = this.getOrdersByStatus(result, this.status1);
    }

    this.ordersList = result;
  }

  public searchTable2() {
    let result = this.ordersListWaitBk;
    if (this.orderCode2 != '' && this.orderCode2 != null) {
      result = this.getOrdersByOrderCode(result, this.orderCode2);
    }

    if (this.area2 != null) {
      result = this.getOrdersByArea(result, this.area2);
    }

    if (this.zone2 != null) {
      result = this.getOrdersByZone(result, this.zone2);
    }

    if (this.phoneNumber2 != '' && this.phoneNumber2 != null) {
      result = this.getOrdersByPhoneNumber(result, this.phoneNumber2);
    }

    this.ordersListWait = result;
  }

  private getOrdersByOrderCode(data: any[], value: string): any[] {
    value = this.commonService.fixTiengViet(value);
    let result = data.filter(item => {
      return this.commonService.fixTiengViet(item.orderCode).search(value) != -1;
    });
    return result;
  }

  private getOrdersByArea(data: any[], value: string): any[] {
    value = this.commonService.fixTiengViet(value);
    let result = data.filter(item => {
      let address = item.address.split(',');
      return this.commonService.fixTiengViet(address[0]) === value;
    });
    return result;
  }

  private getOrdersByZone(data: any[], value: string): any[] {
    value = this.commonService.fixTiengViet(value);
    let result = data.filter(item => {
      let address = item.address.split(',');
      return this.commonService.fixTiengViet(address[1]) === value;
    });
    return result;
  }

  private getOrdersByPhoneNumber(data: any[], value: string): any[] {
    let result = data.filter(item => {
      return this.commonService.fixTiengViet(item.phoneNumber).search(value) != -1;
    });
    return result;
  }

  private getOrdersByStatus(data: any[], value: string): any[] {
    value = this.commonService.fixTiengViet(value);
    let result = data.filter(item => {
      return this.commonService.fixTiengViet(item.orderStatus) === value;
    });
    return result;
  }

}
