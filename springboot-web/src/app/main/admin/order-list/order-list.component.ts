import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    private messageService: MessageService,
    private router: Router,
  ) {
    this.columns = [
      { field: 'orderCode', header: 'Mã đơn hàng' },
      { field: 'address', header: 'Địa chỉ giao hàng' },
      { field: 'totalAmount', header: 'Tổng tiền' },
      // { field: 'totalQty', header: 'Tổng số lượng' },
      // { field: 'paid', header: 'Thanh toán' },
      { field: 'orderStatus', header: 'Trạng thái' },
      { field: 'compleated', header: 'Hoàn tất' },
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
      error: error => {
        if (error.status == 403) {
          this.messageService.add({ severity: 'error', summary: 'Xảy ra lỗi truy cập', detail: 'Vui lòng đăng nhập và thử lại sau!', life: 5000 });
          this.router.navigate(["/login"]);
        }
      }
    });
  }

}
