import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.scss']
})
export class OrderDeliveryComponent implements OnInit {
  public columnsName: any[] = [];
  public deliveryList: any[] = [];

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
      { field: 'totalAmount', header: 'Tiền thu hộ', headerClass: 'text-center', class: 'text-center' },
      { field: 'button', header: 'Xử lý', headerClass: 'text-center', class: 'text-center' },
    ];
  }

  ngOnInit(): void {
    this.getOrdersJustDelivered();
  }

  private getOrdersJustDelivered(): void {
    this.orderService.getOrdersJustDelivered().subscribe({
      next: response => {
        this.deliveryList = response;
      },
      error: this.commonService.erorrHandle()
    });
  }

  public completeDelivery(data: any) {
    this.orderService.completeOrders([data.id]).subscribe({
      next: response => {
        this.getOrdersJustDelivered();
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đơn hàng đã hoàn tất' });
      },
      error: this.commonService.erorrHandle()
    });
  }

}
