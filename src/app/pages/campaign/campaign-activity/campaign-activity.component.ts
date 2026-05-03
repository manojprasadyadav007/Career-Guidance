import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CampaignActivityService } from 'app/services/campaign-activity.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { CampaignActivityAddComponent } from './campaign-activity-add/campaign-activity-add.component';
import { campaignActivityType, enumToName, enumToArray, sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-campaign-activity',
  templateUrl: './campaign-activity.component.html',
  styleUrls: ['./campaign-activity.component.scss']
})
export class CampaignActivityComponent implements OnInit , OnDestroy {

  // columnToDisplay: string[] = ['Type', 'ActivityDate','ActivityDescription',  'Action'];
  // contactList: MatTableDataSource<any>;
  currentUser: Login;
  dataList:any[];

  columns:any[]=[
    { dataField:'ActivityType', title:'Activity Type', type:'', format:'' },
    { dataField:'ActivityDate', title:'Activity Date', type:'date', format:'dd MMM yyyy' },
    { dataField:'AgentName', title:'Agent', type:'', format:'' },
    { dataField:'InstName', title:'Institution', type:'', format:'' },
    { dataField:'ProgramName', title:'Program', type:'', format:'' },
    { dataField:'IntakeName', title:'Intake', type:'', format:'' },
    { dataField:'ActivityResponse', title:'Response', type:'', format:'' },
    { dataField:'DisplayName', title:'Activity User', type:'', format:'' },
  //   { dataField:'ActivityDescription', title:'Description', type:'', format:'' },
  

  ];
  gridMessage: string = 'No data';
    showFilterRow:boolean=false;

    @Input()
    activityAgenttInfo: string;

  @Input()
  parentId: number = 0;

  @Input()
  title: '';

  @Input()
  parentName: 'Activity';

  @Input()
  parentType: number = -1;

  @Input()
  permission: number = 0;

  @Input()
  showCard:boolean=true;

  @Input()
  showfield: boolean = true;

  @Input()
  showagent: boolean = true;

  activityTypeList=campaignActivityType ;

  getName=enumToName; 
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private campaignActivityService: CampaignActivityService,
    private matDialog: MatDialog,
   private authService : AuthenticationService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private activityLog: ActivityLogService) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
      this.currentUser = this.authService.currentUserSubject.getValue();
    }
    

  ngOnInit() {
    this.route.data.subscribe((data: { parentType: number, showagent: string }) => {
       if (data.parentType === 9) {
              this.parentType = 9;
              this.permission = this.authService.checkPermission(sitemap.Marketing_Agent_Activity);
              this.parentName = 'Activity';
              this.title = '';
            }
        if(data.showagent.includes("Agent")){
          this.showagent = true;
        }
        
    });

    if(!this.showfield){
      this.columns.splice(this.columns.findIndex(d => d.title === 'Agent'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Institution'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Program'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Intake'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Response'), 1);
    }else if(this.showfield && !this.showagent){
      this.columns.splice(this.columns.findIndex(d => d.title === 'Agent'), 1);
    }

      this.list();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.activityAgenttInfo !='') this.list(); 
  }
  


  list() {
    this.gridMessage = 'Loading';
    this.campaignActivityService.list(this.parentId, this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.dataList = res;
        this.gridMessage = 'No data';
      //  this.contactList = new MatTableDataSource(res);
    });
  }

  delete(EventId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.campaignActivityService.delete(EventId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Activity deleted successfully");
            this.list();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  add() {
    this.matDialog.open(CampaignActivityAddComponent,
      { data: {showagent: this.showagent, showfield: this.showfield,   ParentId: this.parentId, ParentType: this.parentType, permission: this.permission}, width: '80%', minWidth: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Activity saved successfully");
          this.list();
        }
      });
  }

  edit(ActivityId: number) {
    this.matDialog.open(CampaignActivityAddComponent,
      { data: {showagent: this.showagent, showfield: this.showfield, ActivityId:ActivityId,  ParentId: this.parentId, ParentType: this.parentType, permission: this.permission }, width: '80%', minWidth: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Activity updated successfully");
          this.list();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.parentId, this.parentName, this.title+' Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
