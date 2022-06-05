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
  public columnsName: any[] = [];
  public selectedOrder: any;

  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'orderCode', header: 'Mã đơn hàng', headerClass: 'text-center', class: 'text-center' },
      { field: 'address', header: 'Địa chỉ giao hàng', headerClass: 'text-center', class: '' },
      { field: 'totalAmount', header: 'Tổng tiền', headerClass: 'text-center', class: 'text-center' },
      // { field: 'totalQty', header: 'Tổng số lượng' },
      // { field: 'paid', header: 'Thanh toán' },
      { field: 'orderStatus', header: 'Trạng thái', headerClass: 'text-center', class: 'text-center' },
      { field: 'completed', header: 'Hoàn tất', headerClass: 'text-center', class: 'text-center' },
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
