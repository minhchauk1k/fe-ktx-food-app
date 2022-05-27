import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[] = [];
  private itemsDefault: MenuItem[] = [];

  public activeItem!: MenuItem;

  private ANONYMOUS = 'ANONYMOUS';
  private ROLE_ADMIN = 'ROLE_ADMIN';
  private ROLE_USER = 'ROLE_USER';
  private ROLE_MANAGER = 'ROLE_MANAGER';
  private ROLE_OWNER = 'ROLE_OWNER';
  private ROLE_STAFF = 'ROLE_STAFF';

  constructor(
    public translateService: TranslateService,
    private commonService: CommonService
  ) {
    translateService.use('vi');
  }
  
  ngOnInit(): void {
    // default header
    this.itemsDefault = [
      { label: 'app.title', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
      { label: 'app.food', icon: 'pi pi-fw pi-calendar', routerLink: ['/product'] },
      { label: 'app.service', icon: 'pi pi-fw pi-pencil', routerLink: ['/service'] },
      { label: 'app.information', icon: 'pi pi-fw pi-file', routerLink: ['/about'] },
    ];
    this.checkLogin();
  }

  public checkLogin() {
    this.commonService.roleControl.subscribe(res => {
      switch (res) {
        case this.ANONYMOUS:
          this.resetItem();
          this.items.push({ label: 'app.login', icon: 'pi pi-fw pi-cog', routerLink: ['/login'] });
          break;

        case this.ROLE_USER:
          this.resetItem();
          this.items.push({ label: 'app.your.order', icon: 'pi pi-fw pi-cog', routerLink: ['/order'] });
          this.items.push({ label: 'Đăng xuất', icon: 'pi pi-fw pi-sign-out', command: () => this.commonService.userLogout() });
          break;

        case this.ROLE_ADMIN:
          this.resetItem();
          this.items.push({ label: 'app.admin', icon: 'pi pi-fw pi-cog', routerLink: ['/admin'] });
          this.items.push({ label: 'Đăng xuất', icon: 'pi pi-fw pi-sign-out', command: () => this.commonService.userLogout() });
          break;
      }
    });
  }

  resetItem() {
    this.items = [...this.itemsDefault];
  }
}
