import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { InstituteService } from 'app/services/institute.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap  } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-institution-team',
  templateUrl: './institution-team.component.html',
  styleUrls: ['./institution-team.component.scss']
})
export class InstitutionTeamComponent implements OnInit  , OnDestroy{
  gridMessage: string = 'No data';
  @Input()
  InstitutionId:number;

  @Input()
  parentName: '';

  dataList:any[];

  currentUser: Login;
  permission:number;
  columns:any[]=[
    { dataField:'Name', title:'Name',type:'', format:'' },
    { dataField:'Designation', title:'Designation',type:'', format:'' },
    { dataField:'ContactNo', title:'Contact Number',type:'number', format:'' },
    { dataField:'Email', title:'Email',type:'', format:'' },
     { dataField:'SkypeId', title:'SkypeId',type:'', format:'' },
  ];
  
  // columnToDisplay: string[] = ['Name','Designation','ContactNo','Email','SkypeId'];
   // contactList: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  private onDestroy$: Subject<void> = new Subject<void>();
  showFilterRow:boolean=false;
  excel_permisson: number = 0;
  constructor(private instService:InstituteService,
    private authService:AuthenticationService,
    private activityLog: ActivityLogService
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    
  }
  ngOnInit() {
    if(this.currentUser.RoleType === 2) {
      this.InstitutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Team);
    }
    else
    {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }
    this.gridMessage = 'Loading';
    this.instService.team(this.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
       this.dataList = res;
       this.gridMessage = 'No data';
    });
  }

  activitylog(){
    this.activityLog.activitylog(this.InstitutionId, this.parentName, 'Team Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
