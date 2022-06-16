import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-delivery-lot',
  templateUrl: './order-delivery-lot.component.html',
  styleUrls: ['./order-delivery-lot.component.scss']
})
export class OrderDeliveryLotComponent implements OnInit {

  public lotsList: any[] = [];
  public listCheck: any[] = [];
  public ordersList: any[] = [];
  public columnsName: any[] = [];

  public selectedLot: any;

  private myTimeOut: any;

  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
    private messageService: MessageService
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'showDetails', header: 'Chi tiết', headerClass: 'text-center', class: 'text-center' },
      { field: 'orderCode', header: 'Mã đơn hàng', headerClass: 'text-center', class: '' },
      { field: 'address', header: 'Địa chỉ giao hàng', headerClass: 'text-center my-270', class: 'my-270 text-truncate' },
      { field: 'phoneNumber', header: 'Số điện thoại', headerClass: 'text-center', class: 'text-center' },
      { field: 'totalAmount', header: 'Tiền thu hộ', headerClass: 'text-center', class: 'text-center' },
      // { field: 'button', header: 'Xử lý', headerClass: 'text-center', class: 'text-center' },
    ];
  }

  ngOnInit(): void {
    this.getLotsInCompleted();
  }

  ngAfterViewInit(): void {
    // tạo request mỗi 1 phút
    this.myTimeOut = setInterval(() => {
      this.getLotsInCompletedLoop();
    }, 1000 * 60);
  }

  ngOnDestroy(): void {
    clearInterval(this.myTimeOut);
  }

  private getLotsInCompleted(): void {
    this.orderService.getLotsInCompleted().subscribe({
      next: response => {
        this.lotsList = response;
      },
      error: this.commonService.erorrHandle()
    });
  }

  private getLotsInCompletedLoop(): void {
    this.orderService.getLotsInCompleted().subscribe({
      next: response => {
        this.listCheck = this.lotsList;
        this.lotsList = response;
        this.checkLoop();
      },
      error: this.commonService.erorrHandle()
    });
  }

  private checkLoop() {
    const diff = JSON.stringify(this.listCheck) === JSON.stringify(this.lotsList);
    if (!diff) {
      this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã cập nhật danh sách đơn hàng' });
    }
  }

  public selectOrderLot(): void {
    if (this.selectedLot != null) {
      this.ordersList = this.selectedLot;
    } else {
      this.ordersList = [];
    }
  }

  public completeDeliveryLot() {
    let idList: any[] = [];
    this.ordersList.forEach(val => {
      idList.push(val.id);
    });

    this.orderService.completeOrders(idList).subscribe({
      next: response => {
        this.resetPage();
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đơn hàng đã hoàn tất' });
      },
      error: this.commonService.erorrHandle()
    });
  }

  resetPage() {
    this.getLotsInCompleted();
    this.selectedLot = null;
    this.ordersList = []
  }

}
