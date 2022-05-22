import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  public ORDER = 'ORDER';
  public PREPARING = 'PREPARING';
  public WAITFORPAY = 'WAITFORPAY';
  public PAID = 'PAID';

  public ordersList: any[] = [];
  public ordersListWait: any[] = [];
  public ordersListDelivery: any[] = [];
  public columnsOrder: any[] = [];
  public columnsOrderWait: any[] = [];
  public statusOrderList: any[] = []

  public selectedOrder: any;
  public selectedOrderWait: any;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.columnsOrder = [
      { field: 'orderCode', header: 'Mã đơn hàng' },
      { field: 'address', header: 'Địa chỉ giao hàng' },
      { field: 'orderStatus', header: 'Trạng thái' },
      { field: 'myCustom', header: 'Xử lý' },
    ];

    this.columnsOrderWait = [
      { field: 'orderCode', header: 'Mã đơn hàng' },
      { field: 'address', header: 'Địa chỉ giao hàng' },
      { field: 'orderStatus', header: 'Trạng thái' },
      { field: 'myCustom', header: 'Xử lý' },
    ];

    this.statusOrderList = [
      { label: this.PAID, value: this.PAID },
      { label: this.WAITFORPAY, value: this.WAITFORPAY },
    ]
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.getOrdersJustPaid();
    //   this.getOrdersJustRepaired();
    // }, 1000);

    this.getOrdersJustPaid();
    this.getOrdersJustRepaired();
  }

  private getOrdersJustPaid(): void {
    this.orderService.getOrdersJustPaid().subscribe({
      next: response => {
        this.ordersList = response;
      },
      error: error => {
        if (error.status == 403) {
          this.messageService.add({ severity: 'error', summary: 'Xảy ra lỗi truy cập', detail: 'Vui lòng đăng nhập và thử lại sau!', life: 5000 });
          this.router.navigate(["/login"]);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Xảy ra lỗi', detail: 'Vui lòng liên hệ quản trị viên', life: 5000 });
        }
      }
    });
  }

  private getOrdersJustRepaired(): void {
    this.orderService.getOrdersJustRepaired().subscribe({
      next: response => {
        this.ordersListWait = response;
      },
      error: error => {
        if (error.status == 403) {
          this.messageService.add({ severity: 'error', summary: 'Xảy ra lỗi truy cập', detail: 'Vui lòng đăng nhập và thử lại sau!', life: 5000 });
          this.router.navigate(["/login"]);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Xảy ra lỗi', detail: 'Vui lòng liên hệ quản trị viên', life: 5000 });
        }
      }
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
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: order.orderCode + ' đang được chuẩn bị' });
            break;

          case this.PREPARING:
            // xóa bảng hiện tại
            this.ordersListWait = this.ordersListWait.filter(val => {
              return val.id != order.id;
            });
            // add vào bảng mới
            this.ordersList.push(response);
            this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: order.orderCode + ' bị hủy chuẩn bị' });
            break;
        }
      },
      error: error => {
        if (error.status == 403) {
          this.messageService.add({ severity: 'error', summary: 'Xảy ra lỗi truy cập', detail: 'Vui lòng đăng nhập và thử lại sau!', life: 5000 });
          this.router.navigate(["/login"]);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Xảy ra lỗi', detail: 'Vui lòng liên hệ quản trị viên!', life: 5000 });
        }
      }
    });
  }



}
