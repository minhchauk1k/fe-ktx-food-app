import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.scss']
})
export class MenuDashboardComponent implements OnInit {
  public items: MenuItem[] = [];

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.items = [
      // { label: 'Trang tổng quan', icon: 'pi pi-fw pi-key', routerLink: ['/admin'] },
      {
        label: 'Người dùng', icon: 'pi pi-fw pi-user',
        items: [
          { label: 'Danh sách người dùng', icon: 'pi pi-fw pi-search', routerLink: ['/user-list'] },
          { label: 'Danh sách phân quyền', icon: 'pi pi-fw pi-user', routerLink: ['/role-list'] },
        ]
      },
      // { label: 'Menu bán hàng', icon: 'pi pi-fw pi-list' },
      {
        label: 'Sản phẩm', icon: 'pi pi-fw pi-shopping-bag',
        items: [
          { label: 'Thêm sản phẩm', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/product-add'] },
          { label: 'Danh sách món ăn', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/product-list'] },
          { label: 'Danh sách dịch vụ', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/service-list'] },
        ]
      },
      {
        label: 'Đơn hàng', icon: 'pi pi-fw pi-shopping-cart',
        items: [
          { label: 'Danh sách đơn hàng', icon: 'pi pi-fw pi-search', routerLink: ['/order-list'] },
          { label: 'Chuẩn bị đơn hàng', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/order-management'] },
          { label: 'Vận chuyển đơn hàng', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/order-delivery'] },
          { label: 'Chuẩn bị đơn hàng (LOT)', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/order-management-lot'] },
          { label: 'Vận chuyển đơn hàng (LOT)', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/order-delivery-lot'] },
        ]
      },

      {
        label: 'Hệ thống', icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Danh sách cài đặt', icon: 'pi pi-fw pi-search' },
          { label: 'Địa chỉ', icon: 'pi pi-home', routerLink: ['/address-list']},
        ]
      }
      ,
      {
        label: 'Đăng xuất', icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.commonService.userLogout();
        }
      }
    ];
  }

}
