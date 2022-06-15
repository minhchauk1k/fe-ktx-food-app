import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/service/category.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  ALL = 'ALL';
  DISCOUNT = 'DISCOUNT';
  FOOD = 'FOOD';
  SERVICE = 'SERVICE';

  columnsName: any[] = [];
  categoriesList: any[] = [];
  dropdownList: any[] = [this.FOOD, this.SERVICE];

  currentCategory: any;
  categoryValue: any;
  type: any;

  isShowDialog = false;
  isShowConfirm = false;

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    private categoryService: CategoryService,
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      // { field: 'categoryKey', header: 'Khóa', headerClass: 'text-center', class: '' },
      { field: 'categoryValue', header: 'Giá trị hiển thị', headerClass: 'text-center', class: '' },
      { field: 'type', header: 'Phân loại để hiển thị cho', headerClass: 'text-center', class: 'text-center' },
      { field: 'button', header: '', headerClass: 'text-center', class: 'text-center' },
    ];
  }

  ngOnInit(): void {
    this.getCatagoriesList();
  }

  getCatagoriesList() {
    this.categoryService.getCategories().subscribe({
      next: res => {
        this.categoriesList = res.filter((val: any) => val.categoryKey != this.ALL && val.categoryKey != this.DISCOUNT);
      },
      error: this.commonService.erorrHandle()
    })
  }

  updateCategory(data: any) {
    this.currentCategory = data;
    this.categoryValue = data.categoryValue;
    this.type = data.type;
    this.isShowDialog = true;
  }

  deleteCategory(data: any) {
    this.isShowConfirm = true;
    this.currentCategory = data;
  }

  resultIsDelete(data: any) {
    if (data) {
      this.categoryService.deleteCategory(this.currentCategory.id).subscribe({
        next: res => {
          this.getCatagoriesList();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công' });
        },
        error: this.commonService.erorrHandle()
      });
    }

    this.closeDialog();
  }

  addCategory() {
    this.isShowDialog = true;
  }

  saveData() {
    if (this.currentCategory != null) {
      this.currentCategory.categoryValue = this.categoryValue;
      this.currentCategory.type = this.type;
      this.categoryService.updateCategory(this.currentCategory).subscribe({
        next: res => {
          this.getCatagoriesList();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công' });
        },
        error: this.commonService.erorrHandle()
      })
    } else {
      this.currentCategory = {
        categoryKey: this.categoryValue,
        categoryValue: this.categoryValue,
        type: this.type
      };
      this.categoryService.addCategory(this.currentCategory).subscribe({
        next: res => {
          this.getCatagoriesList();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm thành công' });
        },
        error: this.commonService.erorrHandle()
      })
    }

    this.closeDialog();
  }

  closeDialog() {
    // reset
    this.isShowConfirm = false;
    this.isShowDialog = false;
    this.currentCategory = null;
    this.categoryValue = null;
    this.type = null;
  }

}
