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
    document.getElementsByTagName('html')[0].style.setProperty('overflow-y','overlay');
    document.getElementsByTagName('html')[0].style.setProperty('overflow-x','hidden');
    document.getElementsByTagName('html')[0].style.setProperty('min-width','1366px');

    // set màu cho body
    document.getElementsByTagName('body')[0].style.setProperty('background-color','#f2f2f2');
  }
}
