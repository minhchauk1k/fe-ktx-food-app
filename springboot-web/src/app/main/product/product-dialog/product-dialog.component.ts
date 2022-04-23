import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  public ADD = 'ADD';
  public UPDATE = 'UPDATE';
  public DELETE = 'DELETE';

  @Input() state: any;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  public clickButtonHandle(myForm: NgForm): void {
    switch (this.state) {
      case this.ADD:
        this.productService.addProduct(myForm.value).subscribe((response: Product) => {
          if (response.id) {
            document.getElementById('product-dialog')?.click();
            alert("Đăng ký thành công!");
          }
        })
        break;
      case this.UPDATE:

        break;
      case this.DELETE:

        break;
    }
  }

}
