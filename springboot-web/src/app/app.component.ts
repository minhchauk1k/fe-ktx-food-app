import { Component } from '@angular/core';
import { LoginComponent } from './main/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public login: LoginComponent
  ) { }
  title = 'springboot-web';
}
