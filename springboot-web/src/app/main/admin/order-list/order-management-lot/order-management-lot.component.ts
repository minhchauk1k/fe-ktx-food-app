import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AddressService } from 'src/app/service/address.service';
import { CommonService } from 'src/app/service/common.service';
import { DateService } from 'src/app/service/date.service';
import { OrderService } from 'src/app/service/order.service';
import * as moment from 'moment'

@Component({
  selector: 'app-order-management-lot',
  templateUrl: './order-management-lot.component.html',
  styleUrls: ['./order-management-lot.component.scss']
})
export class OrderManagementLotComponent implements OnInit {

  private DAYS = ' ngày ';
  private HOURS = ' giờ ';
  private MINUTES = ' phút ';
  private LOT_CONTROL = 'LOT_CONTROL';
  private YES = 'YES';
  private SYSTEM = 'SYSTEM';

  public items: MenuItem[] = [];

  public columnsName: any[] = [];
  public lotList: any[] = [];
  public lotListWait: any[] = [];
  public lotListJustRepaired: any[] = [];
  public lotListJustRepairedBk: any[] = [];
  public areaZoneList1: any[] = [];
  public areaZoneList2: any[] = [];
  public ordersList: any[] = [];
  public ordersListBk: any[] = [];
  public ordersListWait: any[] = [];
  public ordersListWaitBk: any[] = [];
  public addressesList: any[] = [];
  public groupByAreaName: any[] = [];
  public addressAreaName: any[] = [];

  public activeItem: boolean = true;
  public isLotControl: boolean = false;

  private myTimeOut: any;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private commonService: CommonService,
    private addressService: AddressService,
    private dateService: DateService,
  ) {
    this.items = [
      { label: 'Đơn hàng khách đã đặt', icon: 'pi pi-fw pi-file', command: () => { this.activeItem = true } },
      { label: 'Đơn hàng đang chuẩn bị', icon: 'pi pi-fw pi-file', command: () => { this.activeItem = false } },
    ];

    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center my-w-45', class: 'text-center my-w-45' },
      { field: 'showDetails', header: 'Chi tiết', headerClass: 'text-center my-w-70', class: 'text-center my-w-70' },
      { field: 'areaZone', header: 'Khu vực', headerClass: 'text-center my-w-340', class: 'my-w-340' },
      { field: 'countDetails', header: 'Số lượng đơn hàng', headerClass: 'text-center my-w-180', class: 'text-center my-w-180' },
      { field: 'timeColor', header: 'Trạng thái', headerClass: 'text-center my-w-120', class: 'text-center my-w-120' },
      { field: 'button', header: 'Xử lý', headerClass: 'text-center my-w-120', class: 'text-center my-w-120' },
    ];
  }

  ngOnInit(): void {
    // tạo request mỗi 1 phút
    this.myTimeOut = setInterval(() => {
      this.getOrdersJustPaid();
    }, 1000 * 60);

    this.getOrdersJustPaid();
    this.getOrderLotsJustRepaired();
    this.getIsLotControl();
    this.getAddresses();
  }

  ngOnDestroy(): void {
    clearInterval(this.myTimeOut);
  }

  private getOrdersJustPaid(): void {
    this.orderService.getOrdersJustPaid().subscribe({
      next: response => {
        this.ordersList = response;
        this.ordersListBk = this.ordersList;

        this.formatAddress(this.ordersList);
        this.createAreaZone1(this.ordersList);
        this.createLotList1(this.ordersList);
      },
      error: this.commonService.erorrHandle()
    });
  }

  private getOrderLotsJustRepaired() {
    this.orderService.getOrderLotsJustRepaired().subscribe({
      next: res => {
        this.lotListJustRepaired = res;
        this.lotListJustRepairedBk = this.lotListJustRepaired;

        this.createLotListWait();
      },
      error: this.commonService.erorrHandle()
    })
  }

  private createLotListWait() {
    // reset 
    this.lotListWait = [];

    this.lotListJustRepaired.forEach(val => {
      this.formatAddress(val.details);
      const details = val.details;
      const timeColor = this.createTimeFromNow(details);
      this.lotListWait.push({ id: val.id, areaZone: val.lotName, details: details, timeColor: timeColor })
    })

  }

  private getIsLotControl(): void {
    this.commonService.getParameter(this.LOT_CONTROL).subscribe({
      next: response => {
        this.isLotControl = (response.parameterValue === this.YES) ? true : false;
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

  private createAreaNameList() {
    // reset
    this.addressAreaName = [];

    for (let item in this.groupByAreaName) {
      this.addressAreaName.push({ label: item, value: item });
    }
  }

  private convertAddressToObject(data: string) {
    const address = data.split(',');
    return {
      area: address[0].trim(),
      zone: address[1].trim(),
      room: address[2].trim()
    }
  }

  private convertObjectToAddress(data: any) {
    return data.area + ', ' + data.zone + ', ' + data.room;
  }

  private formatAddress(data: any[]) {
    data.forEach(val => {
      val.address = this.convertAddressToObject(val.address);
    })
  }

  private returnFormatAddress(data: any[]) {
    data.forEach(val => {
      val.address = this.convertObjectToAddress(val.address);
    })
  }

  private createAreaZone1(data: any[]) {
    // reset
    this.areaZoneList1 = [];

    data.forEach(val => {
      const areaZone = val.address.area + ', ' + val.address.zone;
      if (!this.areaZoneList1.includes(areaZone)) {
        this.areaZoneList1.push(areaZone);
      }
    })
  }

  private createLotList1(data: any[]) {
    // reset
    this.lotList = [];

    this.areaZoneList1.forEach(val => {
      // get details
      const address = val.split(', ');
      const details = data.filter(val => {
        return val.address.area == address[0] && val.address.zone == address[1];
      })

      const timeColor = this.createTimeFromNow(details);

      this.lotList.push({ areaZone: val, details: details, timeColor: timeColor })
    })
  }

  private createTimeFromNow(data: any) {
    // tìm min date
    var datesList: any[] = [];
    data.forEach((val: any) => datesList.push(new Date(val.createDate)));
    const minDate = new Date(Math.min.apply(null, datesList));

    // so sánh cho tới nay
    const now = new Date();
    const duration = moment.duration(now.getTime() - minDate.getTime());

    // trả về value
    let value = duration.days() != 0 ? duration.days() + this.DAYS : '';
    value += duration.hours() != 0 ? duration.hours() + this.HOURS : '';
    value += duration.minutes() != 0 ? duration.minutes() + this.MINUTES : 0 + this.MINUTES;
    return value;
  }

  changeColorByTime(data: any) {
    let timeStr = data.timeColor;
    timeStr = timeStr.replace(this.MINUTES, '');
    timeStr = timeStr.replace(this.HOURS, ',');
    timeStr = timeStr.replace(this.DAYS, ',');
    const time = timeStr.split(',');

    // hơn 1 tiếng
    if (time.length > 1) {
      return 'status_red';
    }

    // dưới 15 phút
    if (time[time.length - 1] <= 15) {
      return 'status_green';
    }

    // từ 15 ~ 30 phút
    if (time[time.length - 1] > 15 && time[time.length - 1] <= 30) {
      return 'status_orange';
    }

    // hơn 30 phút
    return 'status_red';
  }

  public createLotAndDelivery(data: any) {
    this.returnFormatAddress(data.details);

    const newLot = {
      lotName: data.areaZone,
      details: data.details
    }

    this.orderService.addOrderLot(newLot).subscribe({
      next: res => {
        this.getOrdersJustPaid();
        this.getOrderLotsJustRepaired();
        this.messageService.add({ severity: 'info', summary: 'Thành công', detail: 'Lô ' + res.lotCode + ' đang chuẩn bị' });
      },
      error: this.commonService.erorrHandle()
    });
  }

  deliveryLot(data: any) {
    this.orderService.deliveryLot(data.id).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Lô ' + res.lotCode + ' đang được giao' });
        this.getOrderLotsJustRepaired();
      },
      error: this.commonService.erorrHandle()
    });
  }

}
