import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'app/services/report.service';
import { MSMAgentService } from 'app/services/msmagent.service';
import { sitemap } from 'app/models/site-map.model';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-passport-expiry-report',
  templateUrl: './passport-expiry-report.component.html',
  styleUrls: ['./passport-expiry-report.component.scss']
})
export class PassportExpiryReportComponent implements OnInit , OnDestroy {
  gridMessage: string = 'No data';
  reportData:any;
  excel_permisson;
  filterData: any = { fromdate: new Date(), todate:  new Date(), Agent: 0 };
  agentList: any[];
  showAdvance: boolean;
  agentFilter:any ='';
  private onDestroy$: Subject<void> = new Subject<void>();
  showFilterRow:boolean=false;
  constructor(private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private agentService: MSMAgentService,
    private activityLog: ActivityLogService) { 
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
    this.filterData.todate =new Date( this.filterData.todate.setMonth( this.filterData.todate.getMonth()+9));

    this.route.paramMap
    .pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      if (this.authService.checkPermission(sitemap.Reports_PassportExpiry) <= 0) {
        this.router.navigate(['/member/unauthorized']);
        return;
      }

      this.fillAgent();
       
    });
  }
 


  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
   }
   

  showReport() {
    this.reportData = null;
    this.gridMessage = 'Loading';
    this.reportService.passportExpiry(this.filterData).pipe(takeUntil(this.onDestroy$))
    .subscribe(res => {
      this.reportData = res;
      this.gridMessage = 'No data';

    });
  }

  fillAgent() {
    this.agentService.forDDL().pipe(takeUntil(this.onDestroy$))
    .subscribe(res => {
        this.agentList = res;
    });
  }
  activitylog(){
    this.activityLog.activitylog(0, 'Report Passport expiry', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

  customizeTooltip(args) {
    return {
      html: args.seriesName + "<div class='currency'>" + args.originalValue + "</div>"
    };
  }


}
