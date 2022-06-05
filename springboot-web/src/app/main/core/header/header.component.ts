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

  private user: any;

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
      { label: 'app.title', routerLink: ['/'] },
      { label: 'app.food', routerLink: ['/product'] },
      { label: 'app.service', routerLink: ['/service'] },
      { label: 'app.information', routerLink: ['/about'] },
    ];
    this.checkLogin();
  }

  public checkLogin() {
    this.commonService.roleControl.subscribe(res => {
      switch (res) {
        case this.ANONYMOUS:
          this.resetItem();
          this.items.push({ label: 'app.login', routerLink: ['/login'] });
          break;

        case this.ROLE_USER:
          this.resetItem();
          this.items.push({ label: 'app.your.info', routerLink: ['/user-info'] });
          this.items.push({ label: 'app.logout', command: () => this.commonService.userLogout() });
          break;

        case this.ROLE_STAFF:
          this.resetItem();
          this.items.push({ label: 'app.admin', routerLink: ['/admin'] });
          this.items.push({ label: 'app.logout', command: () => this.commonService.userLogout() });
          break;

        case this.ROLE_MANAGER:
          this.resetItem();
          this.items.push({ label: 'app.admin', routerLink: ['/admin'] });
          this.items.push({ label: 'app.logout', command: () => this.commonService.userLogout() });
          break;

        case this.ROLE_OWNER:
          this.resetItem();
          this.items.push({ label: 'app.admin', routerLink: ['/admin'] });
          this.items.push({ label: 'app.logout', command: () => this.commonService.userLogout() });
          break;

        case this.ROLE_ADMIN:
          this.resetItem();
          this.items.push({ label: 'app.admin', routerLink: ['/admin'] });
          this.items.push({ label: 'app.logout', command: () => this.commonService.userLogout() });
          break;
      }
    });
  }

  resetItem() {
    this.items = [...this.itemsDefault];
  }
}
