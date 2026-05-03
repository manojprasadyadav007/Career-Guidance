import { Component, OnInit, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { ReportService } from 'app/services/report.service';
import { Router } from '@angular/router';
import { appPattern, sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InstituteService } from 'app/services/institute.service';
import { MSMAgentService } from 'app/services/msmagent.service';
import { SubTitleService } from 'app/services/sub-title.service';
import { Login } from 'app/models/login.model';
import { MiscService } from 'app/services/misc.service';
import { NgForm } from '@angular/forms';
import { InstitutionIntakeService } from 'app/services/institution-intake.service';
import { Input } from '@angular/core';
import { ActivityLogService } from 'app/services/activity-log.service';



@Component({
  selector: 'app-display-report',
  templateUrl: './display-report.component.html',
  styleUrls: ['./display-report.component.scss']
})
export class DisplayReportComponent implements   OnInit, OnDestroy, OnChanges {

  gridMessage: string = 'No data';
  @Input()
  reportName: string = '';

  @Input()
  title: string = '';

  @Input()
  institutionflag: any = false;

  @Input()
  countryflag: any = false;

  @Input()
  countryIdFilterflag: any = false;

  @Input()
  regionflag: any = false;

  @Input()
  stateflag: any = false;

  @Input()
  intakeflag: any = false;

  @Input()
  DurationStatus: any = false;

  @Input()
  fromToStatusflag: any = false;

  @Input()
  agentflag: any = false;
  

  showcount:boolean;
  resLength:any;
  instList: any = [];
  agentList: any = [];
  countryList: any = [];
  regionList: any = [];
  reportData: any;
  excel_permisson: number = 0;
  agentFilter: any = "";
  countryFilter: any = "";
  countryIdList: any = [];
  countryIdFilter: any = '';
  regionFilter: any = "";
  stateList: any = [];
  stateFilter: any = '';
  intakeList: any = [];
  intakeFilter: any = '';
  instituteFilter: any = "";
  durationFilter: any = "";
  fromtostatusFilter: any = "";
  reportmatched: any;
  subReportUrl: any = ''
  subReport: any = ''
  currentUser: Login;
  formdata: any = { InstitutionId: 0, AgentId: 0, Duration: '1', CountryId: '0', CountryIdFilter: 0, RegionId: 0, IntakeId: 0, StateId: 0, fromdate: new Date(), todate: new Date(), SubReport: '', Filter: 0 };
  @ViewChild(DxPivotGridComponent, { static: false }) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;
  
  showAdvance: boolean;
  DurationList: any = [{ id: '1', name: 'Daily' }, { id: '2', name: 'Weekly' }, { id: '3', name: 'Monthly' }];

  private onDestroy$: Subject<void> = new Subject<void>();
  showFilterRow: boolean = false;


  showFlagCount = 0;

  appPattern=appPattern;

  constructor(private reportService: ReportService,
    private router: Router,
    private miscService: MiscService,
    private InstService: InstituteService,
    private agentService: MSMAgentService,
    private authService: AuthenticationService,
    private subTitleService: SubTitleService,
    private institutionIntakeService: InstitutionIntakeService,
    private activityLog: ActivityLogService,) {
    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    this.currentUser = authService.currentUserSubject.getValue();

   
  }

  ngOnChanges() {
 
  
    this.reportData = null;

    if (this.institutionflag) {
      this.showFlagCount++;
    }
    if (this.agentflag) {
      this.showFlagCount++;
    }
    if (this.DurationStatus) {
      this.showFlagCount++;
    }
    if (this.fromToStatusflag) {
      this.formdata.todate = new Date();
      this.formdata.fromdate = new Date();
      this.formdata.fromdate.setMonth(this.formdata.todate.getMonth()-2);
      this.showFlagCount++;
      this.showFlagCount++;
    }
    if (this.countryflag) {
      this.showFlagCount++;
    }
    if (this.regionflag) {
      this.showFlagCount++;
    }
    if (this.stateflag) {
      this.showFlagCount++;
    }
    if (this.intakeflag) {
      this.showFlagCount++;
    }
    if (this.countryIdFilterflag) {
      this.showFlagCount++;
    }
    if(this.title){
      this.showFlagCount++;
    }

   
    this.dropdownservices();
    this.onInstitutionChange();
  }

  ngOnInit() {
  }

  dropdownservices() {
    if (this.institutionflag && this.currentUser.RoleType != 2) {
      this.InstService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.instList = res;
        this.formdata.InstitutionId = 0;
      });
    }
    if (this.currentUser.RoleType === 2) {
      this.formdata.InstitutionId = this.currentUser.RefId
    }

    if (this.agentflag && this.currentUser.RoleId != 2) {
      this.agentService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.agentList = res;
        this.formdata.AgentId = 0;
      });
    }
    if (this.currentUser.RoleId === 2) {
      this.formdata.AgentId = this.currentUser.RefId
    }
    if (this.countryflag && this.currentUser.RoleType != 2) {
      this.miscService.countryInstOriginOnly().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.countryList = res;
        this.formdata.CountryId = 0;
      });
    }

    this.showReport();


  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.gridMessage = 'Loading';
    this.showReport(form);
  }


  onrowClick(data) {
    if (data.ReportURL) {
      const reportURL = data.ReportURL.toString().split('?')[1].split('&');

      this.formdata.SubReport = reportURL[0].split('=')[1];
      this.formdata.Filter = reportURL[2].split('=')[1]
      this.subTitleService.name.next(this.formdata.SubReport);
      this.router.navigate(['/member/reports/weekly-dashboard'], {
        queryParams: {
          r: this.formdata.SubReport, d: reportURL[1].split('=')[1],
          f: this.formdata.Filter, title: reportURL[3].split('=')[1]
        }
      });
    }
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

  fillProvince(reset?: boolean) {
    this.stateList = [];
    if (reset) {
      this.formdata.StateId = 0;
    }
    if (this.stateflag) {
      this.miscService.province(this.formdata.CountryIdFilter).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.stateList = res;
      });
    }
  }

  fillRegion(reset?: boolean) {
    this.regionList = [];
    if (reset) {
      this.formdata.RegionId = 0;
    }
    if (this.regionflag) {
      this.miscService.getRegion(this.formdata.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.regionList = res;
      });
    }
    this.fillCountry(reset);
  }

  onInstitutionChange(reset?: boolean) {
    this.fillRegion(reset);
    this.fillIntake(reset);
  }

  fillCountry(reset?: boolean) {
    this.countryIdList = [];
    if (reset) {
      this.formdata.CountryIdFilter = 0;
    }
    if (this.countryIdFilterflag) {
      this.miscService.countryByRegion(this.formdata.InstitutionId, this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.countryIdList = res;
      });
    }
    this.fillProvince(reset);
  }

  fillIntake(reset?: boolean) {
    this.intakeList = [];
    if (reset) {
      this.formdata.IntakeId = 0;
    }
    if (this.intakeflag) {
      this.institutionIntakeService.ForDDLByAgentAndCountry(this.formdata.InstitutionId,0,0,0).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.intakeList = res;
      });
    }

  }


  showReport(form?: NgForm) {
    this.reportData = null;

    if (this.showFlagCount > 1 && !form) {
      return;
    }
    this.gridMessage = 'Loading';
    this.reportService.report(this.reportName, this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe((res:any) => {
      this.reportData = res;
      this.gridMessage = 'No data';
      this.resLength=res.data.length
      if(this.resLength==0)
      {
        this.showcount=false;
      }
      this.pivotGrid.instance.bindChart(this.chart.instance, {
        dataFieldsDisplayMode: "splitPanes",
        alternateDataFields: false
      });
    });
  }

  customizeTooltip(args) {
    return {
      html: args.seriesName + "<div class='currency'>" + args.originalValue + "</div>"
    };
  }

  activitylog(){
    var reportname = this.reportName.replace('-', ' ');
    var report = reportname.charAt(0).toUpperCase() + reportname.slice(1);
    this.activityLog.activitylog(0, 'Report '+this.title, 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

}
