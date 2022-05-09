import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Quản lý người dùng', icon: 'pi pi-fw pi-users',
        items: [
          { label: 'Danh sách người dùng', icon: 'pi pi-fw pi-search', },
          { label: 'Danh sách phân quyền', icon: 'pi pi-fw pi-lock-open', },
          { label: 'Xem danh sách', icon: 'pi pi-fw pi-search', }
        ]
      },
      {
        label: 'Quản lý sản phẩm', icon: 'pi pi-fw pi-shopping-bag',
        items: [
          { label: 'Danh sách món ăn', icon: 'pi pi-fw pi-search', routerLink: ['/product'] },
          { label: 'Danh sách dịch vụ', icon: 'pi pi-fw pi-search' },
          { label: 'Menu bán hàng', icon: 'pi pi-fw pi-list' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Quản lý đơn hàng', icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Danh sách đơn hàng', icon: 'pi pi-fw pi-search' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Quản lý hệ thống', icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Danh sách cài đặt', icon: 'pi pi-fw pi-search' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
      ,
      {
        label: 'Đăng xuất', icon: 'pi pi-fw pi-sign-out',
        items: [
          { label: 'Danh sách cài đặt', icon: 'pi pi-fw pi-search' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }

}
