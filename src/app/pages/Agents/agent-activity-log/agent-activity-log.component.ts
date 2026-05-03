import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs/internal/Subject';
import { MSMAgentService } from 'app/services/msmagent.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-agent-activity-log',
  templateUrl: './agent-activity-log.component.html',
  styleUrls: ['./agent-activity-log.component.scss']
})
export class AgentActivityLogComponent implements OnInit, OnDestroy {
    @Input()
    activityAgentLogInfo: string;
    
    @Input()
  parentName: '';

    @Input()
    agentId: number = 0;

    currentUser: Login;
    excel_permisson:number = 0;
    gridMessage: string = 'No data';

    dataList: any[];
    columns: any[] = [
   { dataField:'AgentUserName', title:'User', type:'', format:'' },
   { dataField:'ActivityName', title:'Activity Detail', type:'' , format:'' },
   { dataField:'ActivityDate', title:'Activity Date', type: 'date', format: 'dd MMM yyyy' },
    ];

    showFilterRow: boolean = false;
    private onDestroy$: Subject<void> = new Subject<void>();
    constructor(private agentService: MSMAgentService,
      private authService: AuthenticationService,
      private activityLog: ActivityLogService) {
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
     }

    ngOnInit() {
      this.list();
    }


    list() {
      this.gridMessage = 'Loading';
      this.agentService.foragentLogList(this.agentId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.dataList = res;
          this.gridMessage = 'No data'
        });
    }

    activitylog(){
      this.activityLog.activitylog(this.agentId, this.parentName, 'Log Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
