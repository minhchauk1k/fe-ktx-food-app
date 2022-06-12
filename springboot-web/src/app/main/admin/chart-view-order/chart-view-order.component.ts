import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-chart-view-order',
  templateUrl: './chart-view-order.component.html',
  styleUrls: ['./chart-view-order.component.scss']
})
export class ChartViewOrderComponent implements OnInit {
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
  ) {
  }

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

  createDateReport() {
    const thisWeek = [
      this.orderListWeek[6].length,
      this.orderListWeek[5].length,
      this.orderListWeek[4].length,
      this.orderListWeek[3].length,
      this.orderListWeek[2].length,
      this.orderListWeek[1].length,
      this.orderListWeek[0].length,
    ];
    this.sumThisWeek = this.sumTotal(thisWeek);

    const lastWeek = [
      this.orderListLastWeek[6].length,
      this.orderListLastWeek[5].length,
      this.orderListLastWeek[4].length,
      this.orderListLastWeek[3].length,
      this.orderListLastWeek[2].length,
      this.orderListLastWeek[1].length,
      this.orderListLastWeek[0].length,
    ];
    this.sumLastWeek = this.sumTotal(lastWeek);

    this.data = {
      labels: this.nameDayWeek,
      datasets: [
        {
          label: 'Tuần này',
          data: thisWeek,
          fill: false,
          tension: .4,
          borderColor: '#42A5F5'
        },
        {
          label: 'Tuần trước',
          data: lastWeek,
          fill: false,
          // borderDash: [5, 5],
          tension: .4,
          borderColor: '#FFA726'
        },
      ]
    }
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
