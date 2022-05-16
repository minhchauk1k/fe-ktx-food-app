import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';

  constructor(
    private common: CommonService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.common.userLogin(this.username, this.password);
  }
}
