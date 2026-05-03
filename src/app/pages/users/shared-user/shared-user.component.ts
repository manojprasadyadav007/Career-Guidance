import { Component, OnInit , Input, OnDestroy, SimpleChanges } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router  ,  ActivatedRoute} from '@angular/router';
import { sitemap } from 'app/models/site-map.model';
import { Login } from 'app/models/login.model';
import {  MatDialog } from '@angular/material';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-shared-user',
  templateUrl: './shared-user.component.html',
  styleUrls: ['./shared-user.component.scss']
})
export class SharedUserComponent implements OnInit , OnDestroy {
  
  @Input()
  role: number = 0;

  @Input()
  Id: number = 0;

  @Input()
  parentName: '';
  
  @Input()
  activityUserInfo:'';

  @Input()
  instituteUserInfo: '';

  gridMessage: string = 'No data';
  currentUser: Login;
  permission: number = 0;

  dataList:any;
  private onDestroy$: Subject<void> = new Subject<void>();
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
    {
      dataField: 'RoleName',
      title: 'Role',
      type: '',
      format: ''
    },
  ];
  excel_permisson: number = 0;
  ghost_login_permission:number=0;
  constructor( private authService: AuthenticationService,
    private router:Router,
    private userService : UserService,
    private  matDialog:  MatDialog,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) {
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
      this.ghost_login_permission = authService.checkPermission(sitemap.ghost_login);
        //this.router.routerState.snapshot
     }

  ngOnInit() {
    this.permission = this.authService.checkPermission(sitemap.Users);
  
    if (this.currentUser.RoleType!=1) {
      this.columns.splice(this.columns.findIndex(d => d.title === 'Role'), 1);
    }

    this.listUser();
  }

  listUser() {
    this.gridMessage = 'Loading';
    this.userService.listByRef(this.role ,this.Id).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }
  editUser(userid: number) {
    if (userid > 0) {
      this.router.navigate(['member/users/edit-user', userid] , {state:{roleID: this.role , Id :this.Id}});
    }
    else {
      this.router.navigate(['member/users/add-user'], {state: {roleID: this.role , Id :this.Id}});
    }

  }
  viewUpdate(userId: number, view: number) {
    this.matDialog.open(ConfirmBoxComponent, { data: { title: "CC View", content: "Do you want to change status" } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.userService.ViewUpdate(userId, (view > 0 ? 0 : 1))
          .pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
            this.toasterService.pop('success', 'CC view updated successfully');
            this.listUser();
          });
      }
    });
  }
  deleteUser(userid: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.userService.delete(userid, this.currentUser.UserId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success","User deleted successfully");
            this.listUser();
          }
          else {
            this.toasterService.pop("error","User"+' '+res as any);
          }
        });
      }
    });
  }
  changeStatus(userid: number) {
    this.matDialog.open(ConfirmBoxComponent, { data: { title: "Status", content: "Do you want to change status" } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.userService.statusChange(userid, this.currentUser.UserId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "User status changed successfully");
            this.listUser();
          }
          else {
            this.toasterService.pop("error","User"+' '+res as any);
          }
        });
      }
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

  activitylog(){
    this.activityLog.activitylog(this.Id, this.parentName, 'Users Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.activityUserInfo !=''||this.instituteUserInfo!='') this.listUser(); 
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

}


