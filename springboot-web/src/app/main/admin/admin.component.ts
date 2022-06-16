import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orderLisToday: any[] = [];
  orderListWeek: any[] = [];
  orderListLastWeek: any[] = [];
  isGetAllData = false;

  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getOrderListThisWeek();
  }

  getOrderListThisWeek() {
    this.orderService.getOrderOfThisWeek().subscribe({
      next: res => {
        this.orderListWeek = res;
        this.getOrderListLastWeek();
      },
      error: this.commonService.erorrHandle()
    })
  }

  getOrderListLastWeek() {
    this.orderService.getOrderOfLastWeek().subscribe({
      next: res => {
        this.orderListLastWeek = res;
        this.getOrderListToday();
      },
      error: this.commonService.erorrHandle()
    })
  }

  getOrderListToday() {
    this.orderService.getOrderOfToday().subscribe({
      next: res => {
        this.orderLisToday = res;
        this.isGetAllData = true;
      },
      error: this.commonService.erorrHandle()
    })
  }

}
