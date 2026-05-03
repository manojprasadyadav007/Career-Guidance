import { Component, OnInit, OnDestroy } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit, OnDestroy {

  gridMessage: string = 'No data';
  dataList: any[];
  columns: any[] = [
    {
      dataField: 'DisplayName',
      title: 'Name',
      type: '',
      format: ''
    },
    {
      dataField: 'UserName',
      title: 'Email ID/Username',
      type: '',
      format: ''
    },
    {
      dataField: 'MobileNo',
      title: 'Mobile Number',
      type: '',
      format: ''
    },
    {
      dataField: 'SkypeId',
      title: 'Skype ID',
      type: '',
      format: ''
    },
    // {
    //   dataField: 'isPrimary',
    //   title: 'Primary',
    //   type: '',
    //   format: 'True',
    //   dataType: 'boolean'
    // },
    {
      dataField: 'RoleName',
      title: 'Role',
      type: '',
      format: ''
    },
  ];


  keyworderror:boolean= false;
  currentUser: Login;
  permission: number = 0;
  keyword: any;
  EventType:any='Recently Modified';
  ddl_val: any = this.EventType;
  btn_click:boolean= false;
  formdata: any = { keyword: '' };

  filepath = environment.filepath + 'User/';
  showFilterRow: boolean = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  ghost_login_permission:number=0;
  constructor(private userService: UserService,
    private router: Router,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private authService: AuthenticationService,
    private activityLog: ActivityLogService,
  ) { 
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    this.ghost_login_permission = authService.checkPermission(sitemap.ghost_login);
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = this.authService.checkPermission(sitemap.Users);
    if (this.permission <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }
    if (this.currentUser.RoleType!=1) {
      this.columns.splice(this.columns.findIndex(d => d.title === 'Role'), 1);
    }

    this.listUser(this.EventType);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  listUser(keyword) {
    this.gridMessage = 'Loading';
    this.userService.list(keyword).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  deleteUser(userid: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.userService.delete(userid, this.currentUser.UserId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "User deleted successfully");
            this.listUser(this.ddl_val);
          }
          else {
            this.toasterService.pop("error","User"+' '+res as any);
          }
        });
      }
    });
  }
  ghostLogin(userId:number){
    this.authService.getGhostLogin(userId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (!res.error){
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
          this.router.navigate(['/member/dashboard']); });
      } else {
        this.toasterService.pop("error", res.error);
      }
      
    });
  }

  changeStatus(userid: number) {
    this.matDialog.open(ConfirmBoxComponent, { data: { title: "Status", content: "Do you want to change status" } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.userService.statusChange(userid, this.currentUser.UserId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "User status changed successfully");
            this.listUser(this.ddl_val);
          }
          else {
            this.toasterService.pop("error", res as any);
          }
        });
      }
    });
  }

  editUser(userid: number) {
    if (userid > 0) {
      this.router.navigate(['member/users/edit-user', userid]);
    }
    else {
      this.router.navigate(['member/users/add-user'], {});
    }

  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  resetPassword(userId: number) {
    this.matDialog.open(ConfirmBoxComponent, { data: { title: "Do you want to reset password", content: "Mail will be send on User mail ID" } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.userService.resetPasswordByAdmin(userId)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            if (res === "OK") {
              this.toasterService.pop('success', 'Password reseted successfully, and an email sent to the user');
            }
            else {
              this.toasterService.pop('error', res);
            }
          });
      }
    });
  }

  viewUpdate(userId: number, view: number) {
    this.matDialog.open(ConfirmBoxComponent, { data: { title: "CC View", content: "Do you want to change status" } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.userService.ViewUpdate(userId, (view > 0 ? 0 : 1))
          .pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
            this.toasterService.pop('success', 'CC view updated successfully');
            this.listUser(this.ddl_val);
          });
      }
    });
  }

  
  changeOption(event: any) {
    this.ddl_val = event;
    this.listUser(event);
    if(this.keyworderror)
    {
      this.keyworderror = false;
    }
  }

  searchByKeyword() {
    if(this.keyword==undefined || this.keyword=='')
    {
      this.keyworderror = true;
      this.btn_click= true;
      //     this.listUser("");
    }else
    {
      this.keyworderror= false;
      this.listUser(this.keyword);
    }
  }

  onBlurMethod() {
    if(this.keyword == '') {
      this.listUser(this.ddl_val);
    }
    if(this.keyworderror){this.keyworderror=false};
  }

  searchByEnter(){
    if (this.keyword == undefined || this.keyword == '') {
      this.keyworderror = true;
    } else {
      this.keyworderror = false;
      this.listUser(this.keyword);
    }
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Users', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

}
