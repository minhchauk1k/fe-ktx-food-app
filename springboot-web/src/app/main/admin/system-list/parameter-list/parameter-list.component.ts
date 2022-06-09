import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.css']
})
export class ParameterListComponent implements OnInit {

  columnsName: any[] = [];
  systemList: any[] = [];

  constructor(
    private commonService: CommonService,
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'parameterKey', header: 'Tên biến', headerClass: 'text-center', class: '' },
      { field: 'parameterValue', header: 'Giá trị', headerClass: 'text-center', class: 'text-center' },
      { field: 'button', header: 'Xử lý', headerClass: 'text-center', class: 'text-center' },
    ];
  }

  ngOnInit(): void {
    this.getSystemList();
  }

  getSystemList() {
    this.commonService.getParameters().subscribe({
      next: res => {
        this.systemList = res;
      },
      error: this.commonService.erorrHandle()
    })
  }

}
