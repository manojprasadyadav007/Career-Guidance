import { Component, OnInit, OnDestroy } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import {  enumToName, RoleTypes, sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { PartnerTypeService } from 'app/services/partnerTypesService';
import { AddPartnerTypeComponent } from '../add-partner-type/add-partner-type.component';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-partner-types',
  templateUrl: './show-partner-types.component.html',
  styleUrls: ['./show-partner-types.component.scss']
})
export class ShowPartnerTypesComponent implements OnInit,OnDestroy {

  currentUser: Login;
  permission:number=0;
  gridMessage: string = 'No data';
  getName=enumToName; 
  roleTypes= RoleTypes;
  private onDestroy$: Subject<void> = new Subject<void>();
  dataList:any[];
  columns:any[]=[
    {
      dataField:'PartnerTypeName',
      title:'Partner Type',
      type:'',
      format:''
    },
   
  ];
  showFilterRow:boolean=false;
  excel_permisson: number = 0;

  constructor(private roleService: PartnerTypeService, private matDialog: MatDialog, private router: Router
    ,private authService:AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
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
      this.dataList =res;
      this.gridMessage = 'No data';
    });
  }

  add() {
    this.edit({ PartnerTypeId: 0, PartnerTypeName: '', });
  }

  edit(partnerType: any) {
    this.matDialog.open(AddPartnerTypeComponent, { data: Object.assign({}, partnerType),width:'50%' ,minWidth:'400px' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if(res){
      this.list();
    }
    });
  }

  delete(partnerType: any) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.roleService.delete(partnerType.PartnerTypeId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if(res){
          this.toasterService.pop('success', 'Partner type deleted successfully');
          this.list();
        }
        });
      }
    });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Partner Type', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
