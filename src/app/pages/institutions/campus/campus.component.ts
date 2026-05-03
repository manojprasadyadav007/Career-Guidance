import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { InstCampusService } from 'app/services/inst-campus.service';
import { AddCampusComponent } from './add-campus/add-campus.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap  } from 'app/models/site-map.model';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})
export class CampusComponent implements OnInit , OnDestroy {

  dataList:any[];

  columns:any[]=[
    {
      dataField:'CampusName',
      title:'Name',
      type:'',
      format:''
    },{
      dataField:'City',
      title:'City',
      type:'',
      format:''
    },{
      dataField:'Region',
      title:'Province',
      type:'',
      format:''
    },{
      dataField:'CountryName',
      title:'Country',
      type:'',
      format:''
    }
  ];

    showFilterRow:boolean=false;
    gridMessage: string = 'No data';
  currentUser:Login;
  @Input()
  institutionId: number = 0;

  @Input()
  parentName: '';


  @Input()
  permission:number;

  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private instCampusService: InstCampusService,
    private matDialog: MatDialog,
    private authService:AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) { 

      this.currentUser = this.authService.currentUserSubject.getValue();
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {

    if(this.currentUser.RoleType === 2) {
      this.institutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Campus);
    }
    
    if (this.institutionId > 0) {
      this.listCampus();
    }
  }

  listCampus() {
    this.gridMessage = 'Loading';
    this.instCampusService.list(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dataList =res;
      this.gridMessage = 'No data';
    });
  }

  delete(instDescId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.instCampusService.delete(instDescId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Campus deleted successfully");
            this.listCampus();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  add(instCampusId:number,campusName:string) {
    this.matDialog.open(AddCampusComponent,
      { data: { institutionId: this.institutionId,InstCampusId:instCampusId,CampusName:campusName }, width: '700px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          if(instCampusId){
            this.toasterService.pop("success", "Campus updated successfully");
          }else{
            this.toasterService.pop("success", "Campus saved successfully");
          }
          this.listCampus();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.institutionId, this.parentName, 'Campus Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
