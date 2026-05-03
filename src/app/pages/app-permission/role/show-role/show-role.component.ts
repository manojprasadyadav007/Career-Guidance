import { Component, OnInit, OnDestroy } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { RoleService } from 'app/services/role.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { Router } from '@angular/router';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import {  enumToName, RoleTypes, sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-role',
  templateUrl: './show-role.component.html',
  styleUrls: ['./show-role.component.scss']
})
export class ShowRoleComponent implements OnInit , OnDestroy {

  currentUser: Login;
  permission:number=0;
  gridMessage: string = 'No data';
  getName=enumToName; 
  roleTypes= RoleTypes;
  private onDestroy$: Subject<void> = new Subject<void>();
  dataList:any[];
  columns:any[]=[
    {
      dataField:'RoleName',
      title:'Name',
      type:'',
      format:''
    },
    {
      dataField:'RoleTypeName',
      title:'Type',
      type:'',
      format:''
    },
    {
      dataField:'NoOfUser',
      title:'No Of User\'s',
      type:'',
      format:''
    },
  ];
  showFilterRow:boolean=false;
  excel_permisson: number = 0;

  constructor(private roleService: RoleService, private matDialog: MatDialog, private router: Router
    ,private authService:AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,) {
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {
    if(this.authService.currentUserSubject.getValue().RoleId!=1)
    {
       this.router.navigate(['/member/unauthorized']);
       return;
    }
    this.list();
  }

  list() {
    this.gridMessage = 'Loading';
    this.roleService.list().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      res.forEach((v)=>{
        v.RoleTypeName = this.getName(this.roleTypes,v.RoleType)
      });
      this.dataList =res;
      this.gridMessage = 'No data';
    });
  }

  add() {
    this.edit({ RoleId: 0, RoleName: '', RoleDescription: '',RoleType:1 });
  }

  edit(role: any) {
    this.matDialog.open(AddRoleComponent, { data: Object.assign({}, role),width:'50%' ,minWidth:'400px' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if(res){
      this.list();
    }
    });
  }

  delete(role: any) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.roleService.delete(role.RoleId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if(res){
          this.toasterService.pop('success','Role deleted successfully');
          this.list();
        }
        });
      }
    });
  }
  changePermission(role: any) {
    this.router.navigate(['member/role/permission/'+role.RoleId]);
  }
  
  activitylog(){
    this.activityLog.activitylog(0, 'Roles', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
