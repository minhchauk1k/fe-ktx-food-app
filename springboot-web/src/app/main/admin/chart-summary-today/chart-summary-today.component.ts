import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-summary-today',
  templateUrl: './chart-summary-today.component.html',
  styleUrls: ['./chart-summary-today.component.css']
})
export class ChartSummaryTodayComponent implements OnInit {

  COMPLETED = 'COMPLETED';
  TOTAL_ORDERS = 'TOTAL_ORDERS';
  TOTAL_AMOUNTS = 'TOTAL_AMOUNTS';
  TOTAL_PREPARING = 'TOTAL_PREPARING';
  PREPARING = 'PREPARING';
  NOT_COMPLETED = 'NOT_COMPLETED';
  WAITFORPAY = 'WAITFORPAY';
  PAID = 'PAID';
  TOTAL_DELIVERY = 'TOTAL_DELIVERY';
  DELIVERY = 'DELIVERY';
  TOTAL_COMPLETED = 'TOTAL_COMPLETED';

  columnsName: any[] = [];
  summaryList: any[] = [];

  @Input() orderLisToday: any;

  constructor() {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'statusName', header: 'Thông tin', headerClass: 'text-center', class: '' },
      { field: 'statusTotal', header: 'Số lượng', headerClass: 'text-center', class: 'text-center' },
    ];

    this.summaryList = [
      { statusName: 'Doanh thu trong ngày', statusTotal: 0, key: this.TOTAL_AMOUNTS },
      { statusName: 'Chưa xử lý', statusTotal: 0, key: this.NOT_COMPLETED },
      { statusName: 'Đang chuẩn bị', statusTotal: 0, key: this.TOTAL_PREPARING },
      { statusName: 'Đang giao hàng', statusTotal: 0, key: this.TOTAL_DELIVERY },
      { statusName: 'Đã hoàn thành', statusTotal: 0, key: this.TOTAL_COMPLETED },
    ];
  }

  ngOnInit(): void {
    this.createSummaryDetails();
  }

  createSummaryDetails() {
    this.summaryList.forEach(val => {
      switch (val.key) {

        case this.NOT_COMPLETED:
          let countNotCompleted = 0;
          this.orderLisToday.forEach((order: any) => {
            if (order.orderStatus == this.WAITFORPAY || order.orderStatus == this.PAID) {
              countNotCompleted += 1;
            }
          });
          val.statusTotal = countNotCompleted;
          break;

        case this.TOTAL_AMOUNTS:
          let sumAmount = 0;
          this.orderLisToday.forEach((order: any) => {
            if (order.completed == true && order.orderStatus == this.COMPLETED) {
              sumAmount += order.totalAmount;
            }
          });
          val.statusTotal = sumAmount;
          break;

        case this.TOTAL_PREPARING:
          let countRepairing = 0;
          this.orderLisToday.forEach((order: any) => {
            if (order.orderStatus == this.PREPARING) {
              countRepairing += 1;
            }
          });
          val.statusTotal = countRepairing;
          break;

        case this.TOTAL_DELIVERY:
          let countDelivery = 0;
          this.orderLisToday.forEach((order: any) => {
            if (order.orderStatus == this.DELIVERY) {
              countDelivery += 1;
            }
          });
          val.statusTotal = countDelivery;
          break;

        case this.TOTAL_COMPLETED:
          let countCompleated = 0;
          this.orderLisToday.forEach((order: any) => {
            if (order.orderStatus == this.COMPLETED && order.completed == true) {
              countCompleated += 1;
            }
          });
          val.statusTotal = countCompleated;
          break;
      }
    })
  }

}
