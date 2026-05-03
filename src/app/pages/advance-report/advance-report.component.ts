import { Component, OnInit,  OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';

@Component({
  selector: 'app-advance-report',
  templateUrl: './advance-report.component.html',
  styleUrls: ['./advance-report.component.scss']
})
export class AdvanceReportComponent implements OnInit, OnDestroy {


  reportName: string = '';
  title: string = '';
     
  institutionflag: any = false;
  countryflag: any = false;
  countryIdFilterflag: any = false;
  regionflag: any = false;
  stateflag: any = false;
  intakeflag: any = false;
  DurationStatus: any = false;
  fromToStatusflag: any = false;
  agentflag: any = false;
  currentUser: Login;

  reports: any[] = [
    { ReportName: 'daily-sales', title: 'Daily sales', Permission: sitemap.Reports_DailySales, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: true, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'useractivity', title: 'User activity', Permission: sitemap.Reports_UserActivity, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'programwise', title: 'Program wise', Permission: sitemap.Reports_ProgramWise, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: true, regionDropdownStatus: true, stateDropdownStatus: true, intakeDropdownStatus: true, counterIdFilterDropdownStatus: true },
    { ReportName: 'new-application', title: 'New application', Permission: sitemap.Reports_NewApplication, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: true, counterIdFilterDropdownStatus: false },
    { ReportName: 'deferred-application', title: 'Deferred application', Permission: sitemap.Reports_DeferredApplication, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: true, counterIdFilterDropdownStatus: false },
    { ReportName: 'arrival-application', title: 'Arrival application', Permission: sitemap.Reports_ArrivalApplication, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: true, counterIdFilterDropdownStatus: false },
    { ReportName: 'refundtracker', title: 'Refund tracker', Permission: sitemap.Reports_RefundTracker, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: true, counterIdFilterDropdownStatus: false },
    { ReportName: 'agentinvoicetracker', title: 'Agent invoice tracker', Permission: sitemap.Reports_AgentInvoiceTracker, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'growth-analysis', title: 'Growth analysis', Permission: sitemap.Reports_GrowthAnalysis, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'student-analysis', title: 'Student analysis', Permission: sitemap.Reports_StudentAnalysis, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'daily-sales-with-revenue', title: 'Daily sales with revenue', Permission: sitemap.Reports_DailySalesWithRevenue, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'agent-refund-tracker', title: 'agent refund tracker', Permission: sitemap.Reports_AgentRefundTracker, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'conversion-ratio', title: 'Conversion ratio', Permission: sitemap.Reports_ConversionRatio, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'commission-tracker', title: 'Commission tracker', Permission: sitemap.Reports_CommissionTracker, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'aef-data', title: 'Aef data',  Permission: sitemap.Reports_AEF_data, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },

    { ReportName: 'agentintakewisesummary', title:"Agent intakewise summary", Permission: sitemap.agent_IntakewiseSummary, instDropdownstatus: false, agentDropdownStatus: true, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'institutecountrywisesummary',title:"Institute countrywise summary", Permission: sitemap.institute_Countrywisesummary, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: true, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: true },
    { ReportName: 'instituteintakewisesummary', title:"Institute intakewise summary", Permission: sitemap.institute_Intakewisesummary, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: true, regionDropdownStatus: true, stateDropdownStatus: true, intakeDropdownStatus: false, counterIdFilterDropdownStatus: true },
    { ReportName: 'agentinstitutionintakewisesummary', title:'Agent institution intakewise summary', Permission: sitemap.agent_Institution_Intakewisesummary, instDropdownstatus: false, agentDropdownStatus: true, DurationStatus: false, fromToStatus: false, countryDropdownStatus: true, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'agentinstituteintakewiseperformance',title:"Agent institute intakewise performance", Permission: sitemap.agent_Institute_Intakewise_Performance, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: true, regionDropdownStatus: true, stateDropdownStatus: true, intakeDropdownStatus: false, counterIdFilterDropdownStatus: true },
    { ReportName: 'instituteagentgrowth', title:"Institute agent growth", Permission: sitemap.institute_Agentgrowth, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: true, regionDropdownStatus: true, stateDropdownStatus: true, intakeDropdownStatus: false, counterIdFilterDropdownStatus: true },
    { ReportName: 'institutetoptenprogram', title: "Institute top program", Permission: sitemap.institutet_Opten_Program, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: true, regionDropdownStatus: true, stateDropdownStatus: true, intakeDropdownStatus: true, counterIdFilterDropdownStatus: true },
    { ReportName: 'pendingofferlettercanada', title: "Pending offer letter canada", Permission: sitemap.pending_Offerletter_Canada, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'pendingofferletteruk', title: 'Pending offer letter uk',  Permission: sitemap.pending_Offerletter_Uk, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'summaryofrefund', title:'Summary of refund', Permission: sitemap.summaryof_Refund, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'salesreportcanada', title:'Sales report canada', Permission: sitemap.sales_Report_Canada, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'salesreportusa', title: 'Sales report usa',  Permission: sitemap.sales_Report_Usa, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'salesreportuk', title: 'Sales report uk', Permission: sitemap.sales_Report_Uk, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'salesreporthungary', title: 'Sales report hungary', Permission: sitemap.sales_Report_Hungary, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: true, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'aefmissingdata', title: 'Aef missing', Permission: sitemap.aef_Missing_Data, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'agent-activity', title: 'Agent activity', Permission: sitemap.Agent_Activity, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'weekly-dashboard', title: 'Weekly dashboard', Permission: sitemap.weekly_dashboard, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: true, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'agent-zone-wise', title: 'Agent zone wise', Permission: sitemap.agent_ZonewiseReport, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: true, stateDropdownStatus: true, intakeDropdownStatus: false, counterIdFilterDropdownStatus: true },
    { ReportName: 'marketingactivity', title: 'Marketing activity', Permission: sitemap.marketing_Activity, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'toptenagentperformance', title: 'Top ten agent performance', Permission: sitemap.topten_agent_performance, instDropdownstatus: false, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: true, stateDropdownStatus: true, intakeDropdownStatus: true, counterIdFilterDropdownStatus: true },
    { ReportName: 'statewiseprogramwisesummary', title: 'Statewise programwise summary', Permission: sitemap.state_wise_Programwisesummary, instDropdownstatus: true, agentDropdownStatus: false, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: false, counterIdFilterDropdownStatus: false },
    { ReportName: 'commission-report', title: 'Commission', Permission: sitemap.commission_report, instDropdownstatus: true, agentDropdownStatus: true, DurationStatus: false, fromToStatus: false, countryDropdownStatus: false, regionDropdownStatus: false, stateDropdownStatus: false, intakeDropdownStatus: true, counterIdFilterDropdownStatus: false },
  ];



  private onDestroy$: Subject<void> = new Subject<void>();
  showFilterRow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
   ) {
    this.currentUser = authService.currentUserSubject.getValue();
  }

  

  ngOnInit() {
    var u=  this.router.url.split('/');
    
    this.reportName = u[u.length-1].toLowerCase();

   // this.reportName = param.get("reportname").toLowerCase();

    var sitemaps = this.reports.filter(d =>
      d.ReportName.toLowerCase() === this.reportName).map(d => d.Permission);
    if (!sitemaps || this.authService.checkPermission(sitemaps[0]) <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }
    this.reports.filter(d => d.ReportName.toLowerCase() === this.reportName).map(d => {
      this.institutionflag = (d.instDropdownstatus && this.currentUser.RoleType != 2);
      this.title=d.title;
      this.agentflag = (d.agentDropdownStatus && this.currentUser.RoleType != 2 && this.currentUser.RoleId != 2)
      this.DurationStatus = d.DurationStatus; this.fromToStatusflag = d.fromToStatus;
      this.countryflag = (d.countryDropdownStatus && this.currentUser.RoleId != 2);
      this.regionflag = d.regionDropdownStatus; this.stateflag = d.stateDropdownStatus; this.intakeflag = d.intakeDropdownStatus, this.countryIdFilterflag = d.counterIdFilterDropdownStatus;
    });
    
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
