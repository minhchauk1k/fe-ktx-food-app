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

  DAYS = ' ngày ';
  HOURS = ' giờ ';
  MINUTES = ' phút ';

  public items: MenuItem[] = [];
  public activeItem: boolean = true;

  public columnsName: any[] = [];
  public lotList: any[] = [];
  public ordersList: any[] = [];
  public ordersListBk: any[] = [];
  public areaZoneList: any[] = [];

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
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'showDetails', header: 'Chi tiết', headerClass: 'text-center', class: 'text-center' },
      { field: 'areaZone', header: 'Khu vực', headerClass: 'text-center', class: '' },
      { field: 'countDetails', header: 'Số lượng đơn hàng', headerClass: 'text-center', class: 'text-center' },
      { field: 'timeColor', header: 'Trạng thái', headerClass: 'text-center', class: 'text-center' },
      { field: 'button', header: 'Xử lý', headerClass: 'text-center', class: 'text-center' },
    ];
  }

  ngOnInit(): void {
    // tạo request mỗi 1 phút
    this.myTimeOut = setInterval(() => {
      this.getOrdersJustPaid();
    }, 1000 * 60);

    this.getOrdersJustPaid();
  }

  ngOnDestroy(): void {
    clearInterval(this.myTimeOut);
  }

  private getOrdersJustPaid(): void {
    this.orderService.getOrdersJustPaid().subscribe({
      next: response => {
        this.ordersList = response;
        this.ordersListBk = this.ordersList;

        this.formatAddressOrder();
      },
      error: this.commonService.erorrHandle()
    });
  }

  private convertAddressToObject(data: string) {
    const address = data.split(',');
    return {
      area: address[0].trim(),
      zone: address[1].trim(),
      room: address[2].trim()
    }
  }

  private formatAddressOrder() {
    this.ordersList.forEach(val => {
      val.address = this.convertAddressToObject(val.address);
    })
    this.createAreaZone();
  }

  private createAreaZone() {
    // reset
    this.areaZoneList = [];

    this.ordersList.forEach(val => {
      const areaZone = val.address.area + ', ' + val.address.zone;
      if (!this.areaZoneList.includes(areaZone)) {
        this.areaZoneList.push(areaZone);
      }
    })

    this.createLotList();
  }

  private createLotList() {
    // reset
    this.lotList = [];

    this.areaZoneList.forEach(val => {
      // get details
      const address = val.split(', ');
      const details = this.ordersList.filter(val => {
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

}
