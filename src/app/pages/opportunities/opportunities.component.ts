import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap, enumToName, leadSource } from 'app/models/site-map.model';
import { OpportunitiesService } from 'app/services/opportunities.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss']
})
export class OpportunitiesComponent implements OnInit , OnDestroy {


  formdata:any={keyword:''};
  gridMessage: string = 'No data';

  permission:number=0;


  getName=enumToName;

  leadSourceList=leadSource;

  
  dataList:any[];

  columns:any[]=[
    {
      dataField:'Name',
      title:'Name',
      type:'',
      format:''
    },
    {
      dataField:'MobileNo',
      title:'Mobile Number',
      type:'',
      format:''
    },
    {
      dataField:'Email',
      title:'Email',
      type:'',
      format:''
    },
    {
      dataField:'Country',
      title:'Country',
      type:'',
      format:''
    },
    {
      dataField:'Source',
      title:'Source',
      type:'',
      format:''
    },
    {
      dataField:'AgentName',
      title:'Agent',
      type:'',
      format:''
    },
  ];
  showFilterRow:boolean=false;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private opportunityService: OpportunitiesService,
    authenticationService:AuthenticationService,
    private router:Router,
    private activityLog: ActivityLogService,) { 
      this.permission =authenticationService.checkPermission(sitemap.Opportunity);
      this.excel_permisson = authenticationService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
      this.list();
  }

  list() {
    this.gridMessage = 'Loading';
    this.opportunityService.list(this.formdata.keyword).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      res.forEach((v)=>{
        v.Source = this.getName(this.leadSourceList,v.LeadSource);
      });

       this.dataList=res;
       this.gridMessage = 'No data';
    });
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

  edit(studentId:number)
  {
    this.router.navigate(['/member/leads/edit/'+studentId]);
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Opportunities', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
