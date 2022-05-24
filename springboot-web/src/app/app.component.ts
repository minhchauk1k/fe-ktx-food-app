import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'springboot-web';

  constructor(
    public common: CommonService,
  ) {
    // cái thanh cuộn nó chèn vào màn hình
    document.getElementsByTagName('html')[0].style.overflow='overlay';
  }
}
