import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public items: MenuItem[] = [];
  public activeItem!: MenuItem;

  constructor(
    public translateService: TranslateService
  ) {
    translateService.use('vi');
    // this.items.map(item => item.label = this.translateService.instant(item.label));
  }

  ngOnInit(): void {
    this.items = [
      { label: 'app.title', icon: 'pi pi-fw pi-home', routerLink: ['']},
      { label: 'app.food', icon: 'pi pi-fw pi-calendar', routerLink: ['product']},
      { label: 'app.service', icon: 'pi pi-fw pi-pencil', routerLink: ['service']},
      { label: 'app.information', icon: 'pi pi-fw pi-file', routerLink: ['about']},
      { label: 'app.login', icon: 'pi pi-fw pi-cog', routerLink: ['login']}
    ];

    // this.items = [
    //   // { label: 'Căng Tin KTX UTC2', icon: 'pi pi-fw pi-home'},
    //   { label: 'Đặt đồ ăn', icon: 'pi pi-fw pi-calendar'},
    //   { label: 'Các dịch vụ khác', icon: 'pi pi-fw pi-pencil'},
    //   { label: 'Thông tin và liên hệ', icon: 'pi pi-fw pi-file'},
    //   { label: 'Đăng nhập', icon: 'pi pi-fw pi-cog'}
    // ];
    // this.activeItem = this.items[1];
  }
}
