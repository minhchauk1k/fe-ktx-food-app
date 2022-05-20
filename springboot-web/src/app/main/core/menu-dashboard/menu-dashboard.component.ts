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
        label: 'Người dùng', icon: 'pi pi-fw pi-users',
        items: [
          { label: 'Danh sách người dùng', icon: 'pi pi-fw pi-search', },
          { label: 'Danh sách phân quyền', icon: 'pi pi-fw pi-lock-open', },
        ]
      },
      { label: 'Menu bán hàng', icon: 'pi pi-fw pi-list' },
      {
        label: 'Sản phẩm', icon: 'pi pi-fw pi-shopping-bag',
        items: [
          { label: 'Thêm sản phẩm', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/product/add'] },
          { label: 'Danh sách món ăn', icon: 'pi pi-fw pi-search', routerLink: ['/product'] },
          { label: 'Danh sách dịch vụ', icon: 'pi pi-fw pi-search', routerLink: ['/service']  },
        ]
      },
      {
        label: 'Đơn hàng', icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Danh sách đơn hàng', icon: 'pi pi-fw pi-search' },
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
