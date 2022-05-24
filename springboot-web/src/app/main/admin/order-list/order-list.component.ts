import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public ordersList: any[] = [];
  public columns: any[] = [];
  public selectedOrder: any;

  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
  ) {
    this.columns = [
      { field: 'orderCode', header: 'Mã đơn hàng' },
      { field: 'address', header: 'Địa chỉ giao hàng' },
      { field: 'totalAmount', header: 'Tổng tiền' },
      // { field: 'totalQty', header: 'Tổng số lượng' },
      // { field: 'paid', header: 'Thanh toán' },
      { field: 'orderStatus', header: 'Trạng thái' },
      { field: 'completed', header: 'Hoàn tất' },
    ];
  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this.orderService.getOrders().subscribe({
      next: response => {
        this.ordersList = response;
      },
      error: this.commonService.erorrHandle()
    });
  }

}
