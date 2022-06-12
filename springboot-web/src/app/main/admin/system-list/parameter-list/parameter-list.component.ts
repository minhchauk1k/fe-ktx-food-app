import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.scss']
})
export class ParameterListComponent implements OnInit {
  LOT_CONTROL = 'LOT_CONTROL';
  AUTO_INVENTORY = 'AUTO_INVENTORY';
  YES = 'YES';
  NO = 'NO';
  FOOD = 'FOOD';
  SERVICE = 'SERVICE';
  BOTH = 'BOTH';

  LOT_CONTROL_LIST = [this.NO, this.YES];
  AUTO_INVENTORY_LIST = [this.NO, this.FOOD, this.SERVICE, this.BOTH];

  columnsName: any[] = [];
  systemList: any[] = [];

  isShowParameterDialog = false;

  currentParam: any;
  parameterValueInput: any;
  descriptionInput: any;

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'parameterKey', header: 'Tên biến', headerClass: 'text-center', class: '' },
      { field: 'parameterValue', header: 'Giá trị', headerClass: 'text-center', class: 'text-center' },
      { field: 'description', header: 'Mô tả', headerClass: 'text-center my-max-350', class: 'my-max-350' },
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

  selectParam(data: any) {
    this.currentParam = data;
    this.parameterValueInput = data.parameterValue;
    this.descriptionInput = data.description;
    this.isShowParameterDialog = true;
  }

  updateParameter() {
    // set data
    this.currentParam.parameterValue = this.parameterValueInput;
    this.currentParam.description = this.descriptionInput;

    this.commonService.updateParameter(this.currentParam).subscribe({
      next: res => {
        this.getSystemList();
        this.resetPage();
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công' });
      },
      error: this.commonService.erorrHandle()
    })
    this.isShowParameterDialog = false;
  }

  resetPage() {
    this.currentParam = null;
    this.parameterValueInput = null;
    this.descriptionInput = null;
  }

}
