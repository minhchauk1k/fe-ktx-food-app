import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-confirm-dialog',
  templateUrl: './custom-confirm-dialog.component.html',
  styleUrls: ['./custom-confirm-dialog.component.scss']
})
export class CustomConfirmDialogComponent implements OnInit {
  public isShowDialog = true;
  public headerDisplay = '';
  public messageDisplay = '';
  public buttonYes = '';
  public buttonNo = '';

  @Input() message: any;
  @Input() header: any;
  @Input() yes: any;
  @Input() no: any;
  @Output() result = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.headerDisplay = this.header ? this.header : 'Thông báo';
    this.messageDisplay = this.message ? this.message : 'Bạn có muốn xóa sản phẩm này không?';
    this.buttonYes = this.yes ? this.yes : 'Đồng ý';
    this.buttonNo = this.no ? this.no : 'Không';
  }

  buttonClick(value: boolean) {
    this.result.emit(value);
    this.isShowDialog = false;
  }

}
