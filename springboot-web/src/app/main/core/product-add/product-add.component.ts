import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/service/category.service';
import { CommonService } from 'src/app/service/common.service';
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
  private ALL = 'ALL';
  private DISCOUNT = 'DISCOUNT';

  public isDiscountList: any[] = [];
  public isDiscountTypeList: any[] = [];
  public typeList: any[] = [];
  public categoryList: any[] = [];
  public urlAvatarDisplay: any;

  public checkoutForm = this.formBuilder.group({
    id: '',
    productCode: '',
    productName: ['', [Validators.required]],
    price: [null, [Validators.required]],
    discount: [false, [Validators.required]],
    discountPercent: null,
    discountNumber: null,
    urlAvatar: '',
    description: '',
    category: ['', [Validators.required]],
    type: ['', [Validators.required]],
    discountType: this.NUMBER,
    planQty: [null, [Validators.required]],
  });

  @Input() isDialog: any;
  @Input() productInput: any;
  @Input() stateOfDialog: any;
  @Output() afterExecuted = new EventEmitter<string>();

  constructor(
    private productSevice: ProductService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private commonService: CommonService
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

  private getCategoryList(): void {
    this.categoryService.getCategories().subscribe({
      next: response => {
        // lấy ra tên của response
        let nameFromResponse: any[] = [];
        response.forEach((val: any) => {
          if (val.categoryKey != this.ALL && val.categoryKey != this.DISCOUNT) {
            nameFromResponse.push(val.categoryValue);
          }
        })

        // tạo set duy nhất
        let nameList = new Set(nameFromResponse.sort());

        // gán value cho categoryList
        nameList.forEach(item => {
          this.categoryList.push({ label: item, value: item })
        });
      },
      error: this.commonService.erorrHandle()
    });
  }

  private setValueEntity() {
    const value = this.checkoutForm.value;
    this.productInput.productName = value.productName;
    this.productInput.price = value.price;
    this.productInput.discount = value.discount;
    this.productInput.discountFromDate = value.discountFromDate;
    this.productInput.discountToDate = value.discountToDate;
    this.productInput.discountType = value.discountType;
    this.productInput.discountNumber = value.discountNumber;
    this.productInput.discountPercent = value.discountPercent;
    this.productInput.urlAvatar = value.urlAvatar;
    this.productInput.category = value.category;
    this.productInput.description = value.description;
    this.productInput.type = value.type;
  }

  onSubmit(): void {
    const value = this.checkoutForm.value;

    switch (this.stateOfDialog) {
      case this.UPDATE:
        this.setValueEntity();
        this.productSevice.updateProduct(value).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật sản phẩm thành công', life: 1500 });
          this.resetForm();
          this.afterExecuted.emit(this.UPDATE);
        })
        break;
      default:
        this.productSevice.addProduct(value).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm sản phẩm thành công', life: 1500 });
          this.resetForm();
        });
        break;
    }
  }

  resetForm() {
    this.checkoutForm.reset();
    this.checkoutForm.patchValue({
      discount: false,
      discountType: this.NUMBER
    });
    this.urlAvatarDisplay = '/assets/img/no-image.jpg';
    this.categoryList = [];
    this.getCategoryList();
    this.productInput = null;
  }

  setUrlAvatarInput(url: any) {
    this.urlAvatarDisplay = (!url || url.trim() == '') ? this.urlAvatarDisplay : url;
  }

  setUrlAvatar(event: any) {
    this.urlAvatarDisplay = event.target.value;
  }
}
