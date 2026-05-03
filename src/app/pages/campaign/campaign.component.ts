import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CampaignService } from 'app/services/campaign.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Login } from 'app/models/login.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit , OnDestroy {

  

  formdata:any={keyword:''};

  permission:number=0;

  currentUser:Login;

  dataList:any[];
  gridMessage: string = 'No data';
  columns:any[]=[
    {
      dataField:'CampaignName',
      title:'Name',
      type:'',
      format:''
    },
    {
      dataField:'CampaignType',
      title:'Type',
      type:'',
      format:''
    },
    {
      dataField:'CampaignStatus',
      title:'Status',
      type:'',
      format:''
    },
    {
      dataField:'StartDate',
      title:'Start',
      type:'date',
      format:'dd MMM yyyy'
    },
    {
      dataField:'EndDate',
      title:'End',
      type:'date',
      format:'dd MMM yyyy'
    },
    {
      dataField:'ParentCampaign',
      title:'Parent',
      type:'',
      format:''
    },
  ];
  showFilterRow:boolean=false;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private campaignService:CampaignService,
    private matDialog:MatDialog,
    private router:Router,
    authenticationService:AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,
    ) { 
      this.permission = authenticationService.checkPermission(sitemap.Campaign);
      this.currentUser = authenticationService.currentUserSubject.getValue();
      this.excel_permisson = authenticationService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
    this.list();
  }


  list() {
    this.gridMessage = 'Loading';
    this.campaignService.list(this.formdata.keyword).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dataList=res;
      this.gridMessage = 'No data';
    });
  }

  delete(campaignId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.campaignService.delete(campaignId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success','Campaign deleted successfully');
            this.list();
        });
      }
    });
  }

  add() {
     this.router.navigate(['/member/campaigns/add']);
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

  edit(campaignId:number)
  {
     this.router.navigate(['/member/campaigns/edit/'+campaignId]);
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Campaigns', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
