import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  public rolesList: any[] = [];
  public columnsName: any[] = [];

  constructor(
    private roleService: RoleService,
    private commonService: CommonService,
  ) {
    this.columnsName = [
      { field: 'index', header: 'STT', headerClass: 'text-center', class: 'text-center' },
      { field: 'roleName', header: 'Tên role', headerClass: '', class: '' },
    ];
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: response => {
        this.rolesList = response;
      },
      error: this.commonService.erorrHandle()
    })
  }

}
