import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public usersList: any[] = [];
  public columns: any[] = [];
  public selectedUser: any;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.columns = [
      { field: 'userCode', header: 'Mã người dùng' },
      { field: 'displayName', header: 'Tên hiển thị' },
      { field: 'userName', header: 'Tên người dùng' },
      // { field: 'password', header: 'Mật khẩu' },
      // { field: 'phoneNumber', header: 'Số điện thoại' },
      // { field: 'email', header: 'Email' },
      // { field: 'address', header: 'Địa chỉ' },
      // { field: 'urlAvatar', header: 'Đường dẫn Avatar' },
      // { field: 'deleted', header: 'Đã xóa' },
      // { field: 'active', header: 'Kích hoạt' },
      // { field: 'lastLoginDate', header: 'Lần đăng nhập cuối cùng' },
      { field: 'roles', header: 'Danh sách quyền hạng' },
      // { field: 'createUser', header: 'Người tạo' },
      // { field: 'createDate', header: 'Ngày tạo' },
      // { field: 'updateUser', header: 'Người chỉnh sửa' },
      // { field: 'updateDate', header: 'Ngày chỉnh sửa' },
    ];
  }

  ngOnInit(): void {
    this.getUsers();
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

}
