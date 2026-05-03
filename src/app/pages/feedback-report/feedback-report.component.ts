import { Component, OnInit, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { FeedbackService } from 'app/services/feedback.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-feedback-report',
  templateUrl: './feedback-report.component.html',
  styleUrls: ['./feedback-report.component.scss']
})
export class FeedbackReportComponent implements OnInit , OnDestroy {

 
  currentUser:Login;

  permission:number=0;

  filepath:string = environment.filepath+'Feedback/';

  dataList:any[];
  columns:any[]=[
    {
      dataField:'FeedbackMessage',
      title:'Message',
      type:'',
      format:''
    },
    {
      dataField:'UserName',
      title:'By',
      type:'date',
      format:'dd MMM yyyy'
    },
    {
      dataField:'AddStamp',
      title:'On',
      type:'date',
      format:'dd MMM yyyy'
    },
  ];
  showFilterRow:boolean=false;
  gridMessage: string = 'No data';
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private feedbackService:FeedbackService,
    private authService:AuthenticationService,
    private activityLog: ActivityLogService) {
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.permission = authService.checkPermission(sitemap.FeedbackReport);
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {
    if(this.permission>0)
    {
      this.list();
    }
  }

  list()
  {
    this.gridMessage = 'Loading';
    this.feedbackService.list().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
     this.dataList=res;
     this.gridMessage = 'No data';
    });
  }
 
  
  oncellClick(e){
    if (e.rowType == 'data' && e.column.dataField == "FeedbackMessage") { 
      if(e.data.FeedbackMessage.length>0){
        Swal.fire({
          title: 'Message',
          text: e.data.FeedbackMessage,
        });
      } 
      }   
  }

  onEditorPrepared(e){
  console.log(e);
  }
  
  activitylog(){
    this.activityLog.activitylog(0, 'Report Feedbacks', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
