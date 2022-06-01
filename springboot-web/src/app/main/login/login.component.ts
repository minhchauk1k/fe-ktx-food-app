import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isShowPw= false;

  public checkoutForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.commonService.userLogin(this.checkoutForm.value);
  }
  
  signIn() {
    this.router.navigate(['/sign-in']);
  }

  changeIsShowPw() {
    this.isShowPw = !this.isShowPw;
  }
}
