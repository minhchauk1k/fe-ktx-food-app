import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {
  public items: MenuItem[] = [];

  constructor(
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Người dùng', icon: 'pi pi-fw pi-user',
        items: [
          { label: 'Danh sách người dùng', icon: 'pi pi-fw pi-search', routerLink: ['/user-list'] },
          { label: 'Danh sách phân quyền', icon: 'pi pi-fw pi-id-card', routerLink: ['/role-list'] },
        ]
      },
      { label: 'Menu bán hàng', icon: 'pi pi-fw pi-list' },
      {
        label: 'Sản phẩm', icon: 'pi pi-fw pi-shopping-bag',
        items: [
          { label: 'Thêm sản phẩm', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/product-add'] },
          { label: 'Danh sách món ăn', icon: 'pi pi-fw pi-search', routerLink: ['/product-list'] },
          { label: 'Danh sách dịch vụ', icon: 'pi pi-fw pi-search', routerLink: ['/service-list'] },
        ]
      },
      {
        label: 'Đơn hàng', icon: 'pi pi-fw pi-shopping-cart',
        items: [
          { label: 'Danh sách đơn hàng', icon: 'pi pi-fw pi-search', routerLink: ['/order-list'] },
          { label: 'Quản lý đơn hàng', icon: 'pi pi-fw pi-sync', routerLink: ['/order-management'] },
        ]
      },
      {
        label: 'Hệ thống', icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Danh sách cài đặt', icon: 'pi pi-fw pi-search' },
        ]
      }
      ,
      {
        label: 'Đăng xuất', icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.common.userLogout();
        }
      }
    ];
  }

}
