import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  public isDiscountList: any[] = [];
  public typeList: any[] = [];
  public categoryList: any[] = [];
  public urlAvatarDisplay: any;

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
    this.urlAvatarDisplay = '/assets/img/no-image.jpg';
    this.isDiscountList = [{ label: 'Có', value: true }, { label: 'Không', value: false }];
    this.typeList = [{ label: 'Đồ ăn', value: 'FOOD' }, { label: 'Dịch vụ', value: 'SERVICE' }]
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.productSevice.getProducts().subscribe(response => {
      let nameList = new Set(response.map((item: any) => item.category));
      nameList.forEach(item => {
        this.categoryList.push({ label: item, value: item })
      });
    });
  }

  onSubmit(): void {
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    this.productSevice.addProduct(this.checkoutForm.value).subscribe(response => {
      alert('add');
    });
    // this.checkoutForm.reset();
  }

  setUrlAvatar(event:any){
    this.urlAvatarDisplay = event.target.value;
  }

}
