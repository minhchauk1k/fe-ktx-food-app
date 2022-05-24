import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  public ordersList: any[] = [];
  public ordersListWait: any[] = [];
  public ordersListDelivery: any[] = [];
  public columnsName: any[] = [];
  public statusOrderList: any[] = []

  public isLotControl: boolean = false;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private commonService: CommonService
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'showDetails', header: 'Chi tiết', headerClass: 'text-center', class: 'text-center' },
      { field: 'orderCode', header: 'Mã đơn hàng', headerClass: 'text-center', class: '' },
      { field: 'address', header: 'Địa chỉ giao hàng', headerClass: 'text-center my-270', class: 'my-270 text-truncate' },
      { field: 'phoneNumber', header: 'Số điện thoại', headerClass: 'text-center', class: 'text-center' },
      { field: 'orderStatus', header: 'Trạng thái', headerClass: 'text-center', class: 'text-center' },
      { field: 'button', header: 'Xử lý', headerClass: 'text-center', class: 'text-center' },
    ];

    this.statusOrderList = [
      { label: this.PAID, value: this.PAID },
      { label: this.WAITFORPAY, value: this.WAITFORPAY },
    ]
  }

  ngOnInit(): void {
    // tạo request mỗi 1 phút
    setInterval(() => {
      this.getOrdersJustPaid();
    }, 1000 * 60);

    this.getOrdersJustPaid();
    this.getOrdersJustRepaired();
    this.getIsLotControl();
  }

  private getIsLotControl(): void {
    this.commonService.getParameter(this.LOT_CONTROL).subscribe({
      next: response => {
        this.isLotControl = response == this.YES ? true : false;
      },
      error: this.commonService.erorrHandle()
    });
  }

  private getOrdersJustPaid(): void {
    this.orderService.getOrdersJustPaid().subscribe({
      next: response => {
        this.ordersList = response;
      },
      error: this.commonService.erorrHandle()
    });
  }

  private getOrdersJustRepaired(): void {
    this.orderService.getOrdersJustRepaired().subscribe({
      next: response => {
        this.ordersListWait = response;
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
            // xóa bảng hiện tại
            this.ordersList = this.ordersList.filter(val => {
              return val.id != order.id;
            });
            // add vào bảng mới
            this.ordersListWait.push(response);
            this.ordersListWait.sort((a, b) => a.orderCode - b.orderCode);
            this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: order.orderCode + ' đang được chuẩn bị' });
            break;

          case this.PREPARING:
            // xóa bảng hiện tại
            this.ordersListWait = this.ordersListWait.filter(val => {
              return val.id != order.id;
            });
            // add vào bảng mới
            this.ordersList.push(response);
            this.ordersList.sort((a, b) => a.orderCode - b.orderCode);
            this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: order.orderCode + ' bị hủy chuẩn bị' });
            break;
        }
      },
      error: this.commonService.erorrHandle()
    });
  }

  public deliveryOrders() {
    this.ordersListDelivery = this.ordersListWait;

    let idList: any[] = [];
    this.ordersListDelivery.forEach(val => {
      idList.push(val.id);
    });

    this.orderService.deliveryOrders(idList).subscribe({
      next: response => {
        if (this.isLotControl) {
          console.log(response)
        }
        this.ordersListWait = [];
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đơn hàng đang được giao' });
      },
      error: this.commonService.erorrHandle()
    });
  }

}
