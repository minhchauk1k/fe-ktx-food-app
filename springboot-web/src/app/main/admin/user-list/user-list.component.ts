import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public usersList: any[] = [];
  public columnsName: any[] = [];
  public selectedUser: any;
  isShowRoleDialog = false;
  rolesList: any[] = [];
  currentUser: any;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private roleService: RoleService,
    private commonService: CommonService,
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'userCode', header: 'Mã người dùng', headerClass: 'text-center', class: 'text-center' },
      { field: 'displayName', header: 'Tên hiển thị', headerClass: 'text-center', class: 'text-center' },
      { field: 'userName', header: 'Tên người dùng', headerClass: 'text-center', class: 'text-center' },
      { field: 'roles', header: 'Danh sách quyền hạng', headerClass: 'text-center', class: 'text-center' },
      { field: 'blocked', header: 'Bị khóa', headerClass: 'text-center', class: 'text-center' },
      { field: 'button', header: 'Xử lý', headerClass: 'text-center', class: 'text-center' },
    ];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getRoles(data: any): void {
    // reset 
    this.rolesList = [];

    this.roleService.getRoles().subscribe({
      next: response => {
        this.rolesList = response;
        this.createValueRole(data);
      },
      error: this.commonService.erorrHandle()
    })
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe({
      next: response => {
        this.usersList = response;
      },
      error: error => {
        if (error.status == 403) {
          this.messageService.add({ severity: 'error', summary: 'Xảy ra lỗi truy cập', detail: 'Vui lòng đăng nhập và thử lại sau!', life: 5000 });
          this.router.navigate(["/login"]);
        }
      }
    });
  }

  roleUser(data: any) {
    this.getRoles(data);
    this.currentUser = data;
    this.isShowRoleDialog = true;
  }

  createValueRole(data: any) {
    this.rolesList.forEach(val => {
      val.value = data.roles.filter((x: any) => x.roleName == val.roleName).length ? true : false;
    })
  }

  addRole() {
    this.currentUser.roles = [];
    this.rolesList.forEach(val => {
      if (val.value) {
        this.currentUser.roles.push(val);
      }
    })
    this.userService.updateUser(this.currentUser).subscribe({
      next: res => {
        this.currentUser = null;
        this.getUsers();
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật role thành công' });
      },
      error: this.commonService.erorrHandle()
    })
    this.isShowRoleDialog = false;
  }

  blockUser(data: any) {
    if (data.blocked) {
      data.blocked = false;
      this.userService.updateUser(data).subscribe({
        next: res => {
          this.getUsers();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Unblock thành công' });
        },
        error: this.commonService.erorrHandle()
      })
    } else {
      data.blocked = true;
      this.userService.updateUser(data).subscribe({
        next: res => {
          this.getUsers();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Block thành công' });
        },
        error: this.commonService.erorrHandle()
      })
    }

  }

}
