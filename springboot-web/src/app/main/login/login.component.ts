import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  private SERECT_KEY = "SERECT_KEY";
  private _isLogin = new BehaviorSubject<boolean>(false);
  private _isAdmin = new BehaviorSubject<boolean>(false);
  public isLogin = this._isLogin.asObservable();
  public isAdmin = this._isAdmin.asObservable();

  constructor(
    private common: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.common.login(this.username, this.password).subscribe(response => {
      if (response.accessToken) {
        const access_token = response.accessToken;
        const refresh_token = response.refreshToken;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(access_token);
        const roles: [] = decodedToken.roles;
        this._isLogin.next(true);

        if (roles.length && roles.find(val => val == 'ROLE_ADMIN')) {
          this.router.navigate(["/dashboard"]);
          this._isAdmin.next(true);
        } else {
          this.router.navigate(["/"]);
        }
      }
    });
  }

  logout(){
    this._isLogin.next(false);
    this._isAdmin.next(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

}
