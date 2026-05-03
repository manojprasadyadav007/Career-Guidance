import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentApplicationService } from 'app/services/agent-application.service';
import {  Router } from '@angular/router';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';
import { UtcToLocaltimePipe } from 'app/custom-pipes/utc-to-localtime/utc-to-localtime.pipe'
import { MatDialog } from '@angular/material';
import { PrintComponent } from 'app/pages/print/print.component';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-evaluation-form',
  templateUrl: './show-evaluation-form.component.html',
  styleUrls: ['./show-evaluation-form.component.scss']
})
export class ShowEvaluationFormComponent implements OnInit, OnDestroy {

  dataList:any[];
  columns:any[]= [
    { dataField:'InstName', title:'Institution', type:'', format:'' },
     { dataField:'AgentName', title:'Agent', type:'', format:'' },
     { dataField:'ApplicationStatus', title:'Status', type:'' , format:'' },
     { dataField:'AddStamp', title:'Applied Date', type:'date' , format:'dd MMM yyyy' },
     { dataField:'SubmissionDate', title:'Submitted Date', type:'date' , format:'dd MMM yyyy' },
     { dataField:'StatusDate', title:'Approved/Rejected Date', type:'date' , format:'dd MMM yyyy' },
     { dataField:'StatusRemark', title:'Remark', type:'' , format:'' }
  ];
  showFilterRow:boolean=false;
  gridMessage: string = 'No data';
  permission: number = 0;

  currentUser: Login;

  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(
    private agentApplicationService: AgentApplicationService,
        private authService: AuthenticationService,
    private router: Router,
   private  utcToLocaltimePipe: UtcToLocaltimePipe,
   private matDialog: MatDialog,
   private activityLog: ActivityLogService,
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = authService.checkPermission(sitemap.AgentEvaluationForm)
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);

  }


  ngOnInit() {

    if (this.currentUser.RoleType == 1) {
      this.list();
    }
    else {
      this.router.navigate(['/member/unauthorized']);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  edit(id: number) {
    this.router.navigate(['/member/evaluationform/application-for-institution/edit-application/' + id], { queryParams: { returnUrl: this.router.url } });
  }

  print(id: number) {
    this.router.navigate(['/member/application-for-institution/generate-pdf/' + id]);
  }


  printApplication(id) {

    this.matDialog.open(PrintComponent, {
      data: {
        permission:this.permission,
        agentApplicationId: id,
        title: 'Evaluation Form'
      } ,  width: '95%',  height: '95%'
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }


  list() {
    this.gridMessage = 'Loading';
    this.agentApplicationService.listAll()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      res.forEach(ele =>{
       ele.SubmissionDate = this.utcToLocaltimePipe.transform(ele.SubmissionDate, 'DD MMM YYYY');
      })
      this.dataList = res;
      this.gridMessage = 'No data';
      
    });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Evaluation Form', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

}

