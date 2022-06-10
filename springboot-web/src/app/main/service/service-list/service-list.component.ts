import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  SERVICE = 'SERVICE';

  columnsName: any[] = [];
  servicesList: any[] = [];

  constructor(
    private productService: ProductService,
    private commonService: CommonService,
    private messageService: MessageService,
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'productCode', header: 'Mã món', headerClass: 'text-center', class: 'text-center' },
      { field: 'productName', header: 'Tên món', headerClass: 'text-center', class: '' },
      { field: 'finalPrice', header: 'Giá bán', headerClass: 'text-center', class: 'text-center' },
      { field: 'discount', header: 'Giảm giá', headerClass: 'text-center', class: 'text-center' },
      { field: 'inventory', header: 'Còn hàng', headerClass: 'text-center', class: 'text-center' },
      // { field: 'button', header: 'Xử lý', headerClass: 'text-center', class: 'text-center' },
    ];
  }

  ngOnInit(): void {
    this.getServiceList();
  }

  getServiceList() {
    const param = {
      type: this.SERVICE,
      delete: false
    }

    this.productService.getProductsByTypeAndIsDelete(param).subscribe({
      next: res => {
        this.servicesList = res;

      },
      error: this.commonService.erorrHandle()
    })
  }

  updateStockStatus(data: any) {
    this.productService.updateProduct(data).subscribe({
      next: res => {
        if (data.inventory == false) {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: data.productName + ' đã được bán hết' })
        } else {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: data.productName + ' đang được bán' })
        }
      },
      error: this.commonService.erorrHandle()
    })
  }
}
