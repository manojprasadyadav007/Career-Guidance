import { Component, OnInit,  OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { KpiComparisonSubReportDialogComponent } from './kpi-comparison-sub-report-dialog/kpi-comparison-sub-report-dialog.component';
import { KPIService } from 'app/services/kpi.service';
import { ReportService } from 'app/services/report.service';


@Component({
  selector: 'app-kpi-comparison-dashboard',
  templateUrl: './kpi-comparison-dashboard.component.html',
  styleUrls: ['./kpi-comparison-dashboard.component.scss']
})
export class KpiComparisonDashboardComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();

  durationFilter: any = '';
  agentLogin: any;
  applicationProcessByAdmissionexecutive: any;
  applicationProcessByAgent: any;
  approvedApplication: any;
  businesscertUploaded: any;
  createdAgents: any;
  createdApplication: any;
  createdInstitution: any;
  createdStudents: any;
  deferredApplication: any;
  dropoutApplication: any;
  inprocessApplication: any;
  rejectedApplication: any;
  topCoursesStudentApplied: any;
  topNationality: any;
  formdata = { Duration: 1 }
  DurationList: any = [{ id: 1, name: 'Daily' }, { id: 2, name: 'Weekly' }, { id: 3, name: 'Monthly' }];

  constructor(private matDialog: MatDialog,
    private toasterService: ToasterService,
    private reportService: ReportService,
    private kpiService: KPIService, 
    ) { }

  ngOnInit() {
    this.loadReports();
  }


  showSubReport(reportUrl: any, label: any) {
    if (reportUrl) {
      this.matDialog.open(KpiComparisonSubReportDialogComponent, {
        data: { reportUrl: reportUrl, label: label },
        width: '90%', minWidth: '400px'
      });
    }
  }

  loadData() {
    this.loadReports();
  }


  loadReports() {
    this.agentLogin = null;
    this.applicationProcessByAdmissionexecutive = null;
    this.applicationProcessByAgent = null;
    this.approvedApplication = null;
    this.businesscertUploaded = null;
    this.createdAgents = null;
    this.createdApplication = null;
    this.createdInstitution = null;
    this.createdStudents = null;
    this.deferredApplication = null;
    this.dropoutApplication = null;
    this.inprocessApplication = null;
    this.rejectedApplication = null;
    this.topCoursesStudentApplied = null;
    this.topNationality = null;

    this.kpiService.main('agent-login', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.agentLogin = res.data;
    });

    this.kpiService.main('businesscert-uploaded', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.businesscertUploaded = res.data;
    });

    this.kpiService.main('created-agents', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.createdAgents = res.data;
    });

    this.kpiService.main('created-institution', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.createdInstitution = res.data;
    });

    this.kpiService.main('created-students', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.createdStudents = res.data;
    });

    this.kpiService.main('application-process-by-admissionexecutive', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.applicationProcessByAdmissionexecutive = res.data;
    });

    this.kpiService.main('application-process-by-agent', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.applicationProcessByAgent = res.data;
    });

    //  Application starts
    this.kpiService.main('created-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.createdApplication = res.data;
    });

    this.kpiService.main('approved-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.approvedApplication = res.data;
    });

    this.kpiService.main('deferred-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.deferredApplication = res.data;
    });

    this.kpiService.main('dropout-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dropoutApplication = res.data;
    });

    this.kpiService.main('inprocess-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.inprocessApplication = res.data;
    });

    this.kpiService.main('rejected-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.rejectedApplication = res.data;
    });

    // Application ends

    this.kpiService.main('topCourses-student-applied', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.topCoursesStudentApplied = res.data;
    });

    this.kpiService.main('top-nationality', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.topNationality = res.data;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
