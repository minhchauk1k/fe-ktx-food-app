import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  public displayOptions: any;

  public checkoutForm = this.formBuilder.group({
    productCode: '',
    productName: '',
    discountFromDate: '',
    discountToDate: '',
    price: null,
    isDiscount: false,
    discountPercent: null,
    discountNumber: null,
    urlAvatar: '',
    description: '',
    category: '',
    type: ''
  });

  constructor(
    private productSevice: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.displayOptions = [{ label: 'Có', value: true }, { label: 'Không', value: false }];
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    this.productSevice.addProduct(JSON.stringify(this.checkoutForm.value)).subscribe(response => {
      alert('add');
    });
    // this.checkoutForm.reset();
  }

}
