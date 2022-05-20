import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  public ADD = 'ADD';
  public UPDATE = 'UPDATE';
  public DELETE = 'DELETE';
  public NUMBER = 'NUMBER';
  public PERCENT = 'PERCENT';
  private FOOD = 'FOOD';
  private SERVICE = 'SERVICE';

  public isDiscountList: any[] = [];
  public isDiscountTypeList: any[] = [];
  public typeList: any[] = [];
  public categoryList: any[] = [];
  public urlAvatarDisplay: any;

  public checkoutForm = this.formBuilder.group({
    id: '',
    productCode: '',
    productName: ['', Validators.required],
    discountFromDate: '',
    discountToDate: '',
    price: [null, Validators.required],
    discount: false,
    discountPercent: null,
    discountNumber: null,
    urlAvatar: '',
    description: '',
    category: '',
    type: '',
    discountType: this.NUMBER,
    createUser: null,
    createDate: null
  });

  @Input() isDialog: any;
  @Input() productInput: any;
  @Input() stateOfDialog: any;

  constructor(
    private productSevice: ProductService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.urlAvatarDisplay = '/assets/img/no-image.jpg';
    this.isDiscountList = [{ label: 'Có', value: true }, { label: 'Không', value: false }];
    this.isDiscountTypeList = [{ label: 'Giảm theo %', value: this.PERCENT }, { label: 'Giảm trên giá gốc', value: this.NUMBER }];
    this.typeList = [{ label: 'Đồ ăn', value: this.FOOD }, { label: 'Dịch vụ', value: this.SERVICE }]
  }

  ngOnInit(): void {
    this.getCategoryList();
    if (this.isDialog) {
      this.checkoutForm.patchValue(this.productInput);
      if (this.stateOfDialog == this.UPDATE) {
        this.checkoutForm.get('productCode')!.disable();
      }
      this.setUrlAvatarInput(this.productInput.urlAvatar);
    }
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
    switch (this.stateOfDialog) {
      case this.UPDATE:
        this.productSevice.updateProduct(this.checkoutForm.value).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Cập nhật sản phẩm thành công', life: 1500 });
          this.resetForm();
        })
        break;
      default:
        this.productSevice.addProduct(this.checkoutForm.value).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Thêm sản phẩm thành công', life: 1500 });
          this.resetForm();
        });
        break;
    }
  }

  resetForm() {
    this.checkoutForm.reset();
    this.urlAvatarDisplay = '/assets/img/no-image.jpg';
    this.getCategoryList();
  }

  setUrlAvatarInput(url: any) {
    this.urlAvatarDisplay = url;
  }

  setUrlAvatar(event: any) {
    this.urlAvatarDisplay = event.target.value;
  }

}