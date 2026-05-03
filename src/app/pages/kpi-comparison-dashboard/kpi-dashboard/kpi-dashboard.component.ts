import { Component, OnInit, ViewChild, Input, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { KpiComparisonSubReportDialogComponent } from '../kpi-comparison-sub-report-dialog/kpi-comparison-sub-report-dialog.component';
import { KPIByDateService } from 'app/services/kpibydate.service';



@Component({
  selector: 'app-kpi-dashboard',
  templateUrl: './kpi-dashboard.component.html',
  styleUrls: ['./kpi-dashboard.component.scss']
})
export class KpiDashboardComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  agentDataSource: any;
  applicationReportData:any;
  
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
  formdata = { FromDate:null, ToDate: null }


  constructor(private matDialog: MatDialog,
    private toasterService: ToasterService,
    private kpibyDateService: KPIByDateService) { 
    }

  ngOnInit() {
  }


  showSubReport(reportUrl: any, label: any) {
    if (reportUrl) {
      this.matDialog.open(KpiComparisonSubReportDialogComponent, {
        data: { reportUrl: reportUrl, label: label, FromDate: this.formdata.FromDate, ToDate: this.formdata.ToDate },
        width: '90%', minWidth: '400px'
      });
    }
  }

  showReport() {
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

    this.kpibyDateService.main('agent-login', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.agentLogin = res.data;
      this.agentReportChart();
    });

    this.kpibyDateService.main('businesscert-uploaded', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.businesscertUploaded = res.data;
      this.agentReportChart();
    });

    this.kpibyDateService.main('created-agents', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.createdAgents = res.data;
      this.agentReportChart();
    });
    this.kpibyDateService.main('application-process-by-agent', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.applicationProcessByAgent = res.data;
      this.agentReportChart();
    });


    this.kpibyDateService.main('created-institution', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      res.data.forEach((ele) => {
        ele.Label = ele.Label.replace(':', '');
      });
      this.createdInstitution = res.data;
    });

    this.kpibyDateService.main('created-students', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      res.data.forEach((ele) => {
        ele.Label = ele.Label.replace(':', '');
      });
      this.createdStudents = res.data;
    
    });

    this.kpibyDateService.main('application-process-by-admissionexecutive', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      res.data.forEach((ele) => {
        ele.Label = ele.Label.replace(':', '');
      });
      this.applicationProcessByAdmissionexecutive = res.data;
    });
 

    //  Application starts
    this.kpibyDateService.main('created-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.createdApplication = res.data;
      this.applicationReport();
    });

    this.kpibyDateService.main('approved-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.approvedApplication = res.data;
      this.applicationReport();
    });

    this.kpibyDateService.main('deferred-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.deferredApplication = res.data;
      this.applicationReport();
    });

    this.kpibyDateService.main('dropout-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dropoutApplication = res.data;
      this.applicationReport();
    });

    this.kpibyDateService.main('inprocess-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.inprocessApplication = res.data;
      this.applicationReport();
    });

    this.kpibyDateService.main('rejected-application', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.rejectedApplication = res.data;
      this.applicationReport();
    });

    // Application ends

    this.kpibyDateService.main('topCourses-student-applied', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.topCoursesStudentApplied = res.data;
    });

    this.kpibyDateService.main('top-nationality', this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.topNationality = res.data;
    });
  }

  customizeTooltip(arg: any) {
    return {
        text: arg.percentText + ' - ' + arg.valueText
    };
}

  agentReportChart() {
    this.agentDataSource = [];

    if (this.createdAgents && this.businesscertUploaded && this.agentLogin && this.applicationProcessByAgent) {
      var agentData = [this.createdAgents, this.businesscertUploaded, this.agentLogin, this.applicationProcessByAgent];
      var agentData1 = [].concat.apply([], agentData);
      agentData1.forEach(element => {
        element.Label = element.Label.replace(':', '');
      });
      this.agentDataSource = Object.assign([], agentData1);
    }
  }
  applicationReport() {
    this.applicationReportData = []
    if (this.createdApplication && this.approvedApplication && this.deferredApplication && this.dropoutApplication && this.inprocessApplication && this.rejectedApplication) {
      let applicationData = [this.createdApplication, this.approvedApplication, this.deferredApplication, this.dropoutApplication, this.inprocessApplication, this.rejectedApplication];
      var applicationList = [].concat.apply([], applicationData);
      applicationList.forEach((ele) => {
        ele.Label = ele.Label.replace(':', '');
        this.applicationReportData.push(ele);
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
