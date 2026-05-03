import { Component, OnInit, OnDestroy } from '@angular/core';
import { enumToArray, campaignTypes, campaignStatus, sitemap, appPattern } from 'app/models/site-map.model';
import { CampaignService } from 'app/services/campaign.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserService } from 'app/services/user.service';
import { InstituteService } from 'app/services/institute.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { ProgramService } from 'app/services/program.service';
import { SubTitleService } from 'app/services/sub-title.service';
import { MatTableDataSource } from '@angular/material';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { Login } from 'app/models/login.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.scss']
})
export class CampaignAddComponent implements OnInit , OnDestroy {

  campaignTypeList = enumToArray(campaignTypes);
  campaignStatusList = enumToArray(campaignStatus);
  parentCampaignList: any[];
  flagdisabled:boolean = false;
  parentName: string = 'Campaign';
  campaignId: number = 0;
  ownerFilter:any ='';
  typeFilter:any ='';
  statusFilter:any ='';
  parentFilter:any = '';
  instFilter:any ='';
  regionFilter:any='';
  programFilter:any='';
  intakeFilter:any='';
  btnLabel: string = 'Save';
  materialList: MatTableDataSource<any>;

   

  formdata: any = {
    CampaignId: 0,
    CampaignName: '',
    CampaignType: null,
    CampaignStatus: null,
    StartDate: '',
    EndDate: '',
    ExpectedRevenue: 0,
    BudgetCost: 0,
    ActualCost: 0,
    ExpectedResponsePer: 0,
    NumSentInCampaign: 0,
    CampaignDescription: '',
    ParentCampaign: '',
    CampaignOwner: null,
    InstitutionId: null,
    RegionId: 0,
    ProgramId: 0,
    IntakeId:0
  }

  permission: number = 0;

  userList: any[];
  institutionList: any[];
  regionList: any[];
  programList: any[];
  intakeList: any[];

  modelPattern = appPattern;

  currentUser:Login;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private campaignService: CampaignService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    authService: AuthenticationService,
    private userService: UserService,
    private instService: InstituteService,
    private instCountryService: InstCountryService,
    private programService: ProgramService,
    private subTitleService: SubTitleService,
    private intakeService: ProgramIntekService,
    private mandatoryfieldCheckService : MandatoryfieldCheckService
  ) {
    this.permission = authService.checkPermission(sitemap.Campaign);
    this.currentUser = authService.currentUserSubject.getValue();
    this.formdata.CampaignOwner = this.currentUser.UserId;
  }

  ngOnInit() {

    

    this.userService.forDDL('', '',0).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.userList = res;
    });

    this.instService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.institutionList = res;
    });

    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.campaignId = +param.get('id') | 0;
      this.get();
    });

    this.campaignService.ddl().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.parentCampaignList = res.filter(value => value.CampaignId != this.campaignId);
    });
  }

  add(form:NgForm) {

    if(form.invalid)
    {
      this.mandatoryfieldCheckService.setinvalidFields();
        return;
    }
    this.flagdisabled = true;
    if (this.formdata.CampaignId > 0) {
      this.campaignService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success','Campaign updated successfully');
        this.flagdisabled =false;
      },err =>{
          this.flagdisabled =false;
      });
    }
    else {
      this.campaignService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Campaign saved successfully');
        this.flagdisabled = false;
        this.router.navigate(['/member/campaigns/edit/' + res]);
      },err =>{
        this.flagdisabled = false;
      });
    }
  }

  get() {
    if (this.campaignId > 0) {
      this.campaignService.get(this.campaignId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
        this.fillRegion(false);
        this.fillIntake(false);
        this.btnLabel = 'Update';
        this.subTitleService.name.next(this.formdata.CampaignName);
      });
    }
  }


  fillRegion(resetValue:boolean) {
    this.regionList = [];
    this.programList = [];
    this.intakeList=[];

    if(resetValue)
    {
       this.formdata.ProgramId=0;
       this.formdata.RegionId =0 ;
    }

    if (this.formdata.InstitutionId > 0) {
      this.instCountryService.list(this.formdata.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.regionList = res;
      });

      this.programService.forDDL(this.formdata.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.programList = res;
      });
    }
  }

  fillIntake(resetValue:boolean) {
    this.intakeList = [];
    if(resetValue)
    {
      this.formdata.IntakeId=0;
    }
      this.intakeService.forDDL(this.formdata.ProgramId, this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => { this.intakeList = res; });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
