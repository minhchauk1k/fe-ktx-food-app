import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.scss']
})
export class MenuDashboardComponent implements OnInit {

  private ANONYMOUS = 'ANONYMOUS';
  private ROLE_ADMIN = 'ROLE_ADMIN';
  private ROLE_USER = 'ROLE_USER';
  private ROLE_MANAGER = 'ROLE_MANAGER';
  private ROLE_OWNER = 'ROLE_OWNER';
  private ROLE_STAFF = 'ROLE_STAFF';

  public items: MenuItem[] = [];
  public items_STAFF: MenuItem[] = [];
  public items_ADMIN: MenuItem[] = [];

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.items_ADMIN = [
      { label: 'Trang tổng quan', icon: 'pi pi-fw pi-key', routerLink: ['/admin'] },
      {
        label: 'Người dùng', icon: 'pi pi-fw pi-user',
        items: [
          { label: 'Danh sách người dùng', icon: 'pi pi-fw pi-search', routerLink: ['/user-list'] },
          { label: 'Danh sách phân quyền', icon: 'pi pi-fw pi-user', routerLink: ['/role-list'] },
        ]
      },
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
          { label: 'Chuẩn bị đơn hàng (LOT)', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/order-management-lot'] },
        ]
      },
      {
        label: 'Vận chuyển', icon: 'pi pi-fw pi-sign-out',
        items: [
          { label: 'Vận chuyển đơn hàng', icon: 'pi pi-fw pi-sign-out', routerLink: ['/order-delivery'] },
          { label: 'Vận chuyển đơn hàng (LOT)', icon: 'pi pi-fw pi-sign-out', routerLink: ['/order-delivery-lot'] },
        ]
      },
      { label: 'Phân loại sản phẩm', icon: 'pi pi-fw pi-tag', routerLink: ['/category-list'] },
      { label: 'Sổ địa chỉ', icon: 'pi pi-home', routerLink: ['/address-list'] },
      { label: 'Biến hệ thống', icon: 'pi pi-fw pi-cog', routerLink: ['/parameter-list'] },
      // {
      //   label: 'Hệ thống', icon: 'pi pi-fw pi-cog',
      //   items: [
      //   ]
      // },
      // {
      //   label: 'Đăng xuất', icon: 'pi pi-fw pi-sign-out',
      //   command: () => {
      //     this.commonService.userLogout();
      //   }
      // }
    ];

    this.items_STAFF = [
      {
        label: 'Đơn hàng', icon: 'pi pi-fw pi-shopping-cart',
        items: [
          { label: 'Danh sách đơn hàng', icon: 'pi pi-fw pi-search', routerLink: ['/order-list'] },
        ]
      },
      {
        label: 'Vận chuyển', icon: 'pi pi-fw pi-sign-out',
        items: [
          { label: 'Vận chuyển đơn hàng', icon: 'pi pi-fw pi-sign-out', routerLink: ['/order-delivery'] },
          { label: 'Vận chuyển đơn hàng (LOT)', icon: 'pi pi-fw pi-sign-out', routerLink: ['/order-delivery-lot'] },
        ]
      },
    ];

    this.checkLogin();
  }

  checkLogin() {
    this.commonService.roleControl.subscribe(res => {
      switch (res) {
        case this.ROLE_STAFF:
          this.items = this.items_STAFF;
          break;

        case this.ROLE_MANAGER:
        case this.ROLE_OWNER:
        case this.ROLE_ADMIN:
          this.items = this.items_ADMIN;
          break;
      }
    });
  }

}
