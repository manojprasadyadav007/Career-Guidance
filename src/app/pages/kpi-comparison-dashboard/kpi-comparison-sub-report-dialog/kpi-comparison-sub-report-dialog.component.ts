import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { environment } from 'environments/environment';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { KPIByDateService } from 'app/services/kpibydate.service';
import { KPIService } from 'app/services/kpi.service';
import { StudentDocumentService } from 'app/services/student-document.service';
import { ActivityLogService } from 'app/services/activity-log.service';



@Component({
  selector: 'app-kpi-comparison-sub-report-dialog',
  templateUrl: './kpi-comparison-sub-report-dialog.component.html',
  styleUrls: ['./kpi-comparison-sub-report-dialog.component.scss']
})
export class KpiComparisonSubReportDialogComponent implements OnInit, OnDestroy {

  gridMessage: string = 'No data';
  parentName = '';
  reportName = '';
  showAdvance: boolean;
  reportData: any;
  subReportUrl: any = ''
  subReport: any = ''
  label: any = ''
  filepath: string = environment.filepath;
  uploadDir = 'kpi';
  formdata: any = { InstitutionId: '0', AgentId: '0', Duration: '1', SubReport: '', Filter: 0, FromDate: null, ToDate: null };

  private onDestroy$: Subject<void> = new Subject<void>();
  showFilterRow:boolean = false;
  
  excel_permisson: number = 0;
  constructor(authService: AuthenticationService,
    private kpibyDateService: KPIByDateService,
    private kpiService: KPIService,
    @Inject(MAT_DIALOG_DATA) data,
    private studentDocumentService: StudentDocumentService,
    private activityLog: ActivityLogService,) {

    this.subReportUrl = data.reportUrl;
    this.label = data.label.replace(/:/, " ");
    this.formdata.FromDate = data.FromDate;
    this.formdata.ToDate = data.ToDate;
    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {

    this.showReport();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  showReport() {
    if (this.formdata.FromDate) {
      this.gridMessage = 'Loading';
      this.parentName = "KPI Dashboard"
      this.kpibyDateService.sub(this.subReportUrl, this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.reportData = res;
        this.gridMessage = 'No data';
      });
    }
    else if (this.subReportUrl) {
      const reportURL = this.subReportUrl.toString().split('?')[1].split('&');
      this.formdata.SubReport = reportURL[0].split('=')[1];
      this.formdata.Duration = reportURL[1].split('=')[1];
      this.formdata.Filter = reportURL[2].split('=')[1];
      this.gridMessage = 'Loading';
      this.parentName = 'KPI Comparison Dashboard';
      this.kpiService.sub(this.formdata.SubReport, this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.reportData = res;
        this.gridMessage = 'No data';
      });
    }
  }

  customizeTooltip(args) {
    return {
      html: args.seriesName + '<div class=\'currency\'>' + args.originalValue + '</div>'
    };
  }

  downloadFile(documentId: number, parentId: number, dir: string) {
    this.studentDocumentService.downloadFile(documentId, parentId, dir).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      window.open(this.filepath+'download/'+res);
    });
  }

  activitylog(){
    this.activityLog.activitylog(0, this.parentName, this.label+' Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }
}
