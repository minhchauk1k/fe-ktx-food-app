import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-chart-view-sales',
  templateUrl: './chart-view-sales.component.html',
  styleUrls: ['./chart-view-sales.component.scss']
})
export class ChartViewSalesComponent implements OnInit {

  data: any;
  orderListWeek: any[] = [];
  orderListLastWeek: any[] = [];
  nameDayWeek: any[] = [];
  days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  sumThisWeek: any;
  sumLastWeek: any;
  isMinus = false;
  percent: any;

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
        this.createNameOfWeek();
        this.createDateReport();
      },
      error: this.commonService.erorrHandle()
    })
  }

  createNameOfWeek() {
    const today = new Date();
    let temp = new Date()
    this.nameDayWeek = [];
    temp.setDate(today.getDate() - 6);
    this.nameDayWeek.push(this.days[temp.getDay()]);

    temp.setDate(today.getDate() - 5);
    this.nameDayWeek.push(this.days[temp.getDay()]);

    temp.setDate(today.getDate() - 4);
    this.nameDayWeek.push(this.days[temp.getDay()]);

    temp.setDate(today.getDate() - 3);
    this.nameDayWeek.push(this.days[temp.getDay()]);

    temp.setDate(today.getDate() - 2);
    this.nameDayWeek.push(this.days[temp.getDay()]);

    temp.setDate(today.getDate() - 1);
    this.nameDayWeek.push(this.days[temp.getDay()]);

    this.nameDayWeek.push(this.days[today.getDay()]);
  }

  createDataThisWeek() {
    let thisWeek: any[] = [];

    this.orderListWeek.forEach((data: any[]) => {
      let sum = 0;
      data.forEach((val: any) => {
        sum += val.totalAmount;
      });
      thisWeek.push(sum);
    });
    this.sumThisWeek = this.sumTotal(thisWeek);
    return thisWeek;
  }

  createDataLastWeek() {
    let lastWeek: any[] = [];

    this.orderListLastWeek.forEach((data: any[]) => {
      let sum = 0;
      data.forEach((val: any) => {
        sum += val.totalAmount;
      });
      lastWeek.push(sum);
    });
    this.sumLastWeek = this.sumTotal(lastWeek);
    return lastWeek;
  }

  createDateReport() {
    this.data = {
      labels: this.nameDayWeek,
      datasets: [
        {
          label: 'Tuần này',
          backgroundColor: '#42A5F5',
          data: this.createDataThisWeek().reverse()
        },
        {
          label: 'Tuần trước',
          backgroundColor: '#FFA726',
          data: this.createDataLastWeek().reverse()
        }
      ]
    };
  }

  sumTotal(data: any) {
    let sum = 0;
    data.forEach((val: number) => sum += val);
    return sum;
  }

  calcPercentWeek() {
    this.isMinus = this.sumThisWeek >= this.sumLastWeek ? false : true;
    if (!this.isMinus) {
      this.percent = (this.sumThisWeek - this.sumLastWeek) / this.sumLastWeek;
    } else {
      this.percent = (this.sumLastWeek - this.sumThisWeek) / this.sumThisWeek;
    }
    return this.percent;
  }

}
