import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent implements OnInit {
  public items: MenuItem[] = [];

  @Input() listMenu: any;
  @Output() getTagName = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.listMenu.forEach((val: any) => {
      this.items.push({
        label: val.categoryValue, icon: 'pi pi-fw pi-tag', command: () => {
          this.onClickTag(val.categoryKey);
        }
      });
    });
  }

  onClickTag(value: string) {
    this.getTagName.emit(value);
  }
}
