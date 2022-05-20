import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css']
})
export class MenuCategoryComponent implements OnInit {
  public items: MenuItem[] = [];

  @Input() listMenu: any;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() {
    this.items.push({
      label: 'Tất cả', icon: 'pi pi-fw pi-tag', command: () => {
        this.onClickTag('ALL');
      }
    });
  }

  ngOnInit(): void {
    this.listMenu.forEach((element: any) => {
      this.items.push({
        label: element, icon: 'pi pi-fw pi-tag', command: () => {
          this.onClickTag(element);
        }
      });
    });
  }

  onClickTag(value: string) {
    this.newItemEvent.emit(value);
  }
}
