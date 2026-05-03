import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MSMAgent } from 'app/models/agent-model';
import { MSMAgentService } from 'app/services/msmagent.service';
import { MiscService } from 'app/services/misc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { MatTabGroup } from '@angular/material';
import { Login } from 'app/models/login.model';
import { sitemap, AppDefaultValue, appPattern } from 'app/models/site-map.model';
import { environment } from 'environments/environment';
import { ActivityService } from 'app/services/activity.service';
import { SubTitleService } from 'app/services/sub-title.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
import { OnDocumentUploadService } from 'app/services/on-document-upload.service';
import { TabService } from 'app/services/tab-service';
import { PreviousRouteService } from 'app/services/previousPath.service';
import { AgentDocumentService } from 'app/services/agent-document.service';
import { CommonService } from 'app/services/common.service';
@Component({
  selector: 'app-add-agents',
  templateUrl: './add-agents.component.html',
  styleUrls: ['./add-agents.component.scss']
})
export class AddAgentsComponent implements OnInit, OnDestroy, AfterViewInit {

  replydata: any = { ActivityType: 2, Remark: '', StatusId: 0, Priority: -1 };
  activityList: any[];
  agentStatusList: any[];
  overTitlesshow = [];
  modelPattern = appPattern;
  bussinessFilter: any = '';
  contryFilter: any = '';
  primcountryFilter: any = '';
  secondcountryFilter: any = '';
  countryFilter: any = '';
  partnerFilter: any = '';
  partnerList: any[];
  pageName: any = "";
  previousUrl: any;
  parentName: string = 'Agent';
  provinceList: any;
  branchInfo:any;
  provinceListForPrimCont: any;
  provinceListForSecondCont: any;
  provinceListForDirectorCont: any;
  tempArr:any;
  provinceFilter: any = '';
  primContProvinceFilter: any = '';
  secondContProvinceFilter: any = '';
  directorContProvinceFilter: any = '';
  @Input()
  id = 0;

  @Input()
  isProfile = 0;

  btnLabel = 'Save';
  formdata: MSMAgent;
  countryList: any[];

  CompanyLogo: File;
  BusinessCert: File;

  currentUser: Login;
  companyPattern = /^(?![&-.\s])(?=.*[A-Z])(?=.*[0-9A-Z-&.])[A-Z0-9-&.\s]+$/i;
  missingDocument: string[];
  filepath: string = environment.filepath + '';

  documentList: any[];
  @Input()
  permission = 0;
  originDetails = "agentDoc";
  currentUrl = '';
  preEmailid = '';
  flagdisabled = false;

  can_update = false;

  @ViewChild('geneform', { static: false }) formStatus: NgForm;
  formstatus: any;
  businessCertificateStatus: any;
  profileFormStatus: any;

  agreementPermission = 0;

  aefPermission = 0;
  currencyList: string[];
  cnyFilter: any = '';
  institutionInfo = '';
  agreementInfo = '';
  referenceInfo = '';
  documentInfo = '';
  activityUserInfo='';
  evalFormInfo = '';
  // associateInstInfo = '';
  activityAgenttInfo = '';
  activityAgentLogInfo = '';
  selectedIndex: number = 0;
  private onDestroy$: Subject<void> = new Subject<void>();
  @ViewChild('matTab', { static: false }) tabs: MatTabGroup
  constructor(private agentService: MSMAgentService,
    private miscService: MiscService,
    private route: ActivatedRoute
    , private router: Router
    , private authService: AuthenticationService
    , private toasterService: ToasterService,
    private activityService: ActivityService
    , private subTitleService: SubTitleService,
    private mandatoryfieldCheckService: MandatoryfieldCheckService,
    private agentDocument: AgentDocumentService,
    private onDocumentUploadService: OnDocumentUploadService,
    private tabService: TabService,
    private previousRouteService: PreviousRouteService,
    private commonService: CommonService

  ) {


    this.currentUrl = this.router.url;
    this.currentUser = this.authService.currentUserSubject.getValue();
    if (this.permission == 0) {
      this.permission = this.authService.checkPermission(sitemap.Agent);
    }

    this.agreementPermission = this.authService.checkPermission(sitemap.Agent_Agreement);

    if (this.isProfile === 1) {
      this.aefPermission = 3;
    } else {
      this.aefPermission = this.authService.checkPermission(sitemap.AgentEvaluationForm);
    }

    if (this.currentUser.RoleId === 2) {
      this.commonService.BusinessProfileStatus.pipe(takeUntil(this.onDestroy$)).subscribe(status => {
        if (status.toLowerCase() == 'uploaded') {
          this.currentUser.BusinessCertFound = 1;
        } else if (status.toLowerCase() == 'pending') {
          this.currentUser.BusinessCertFound = 0;
        }
        this.businessCertificateStatus = status.toLowerCase();
      });
      this.agentService.businessCertStatus().pipe(takeUntil(this.onDestroy$)).subscribe(status => {
        this.businessCertificateStatus = status.toLowerCase();
      });
    }


    // if(this.agreementPermission<3)
    // {
    //    this.agreementPermission=0;
    // }

  }
  ngAfterViewInit() {


    this.previousUrl = this.previousRouteService.getPreviousUrl();
    this.pageName = this.previousRouteService.getCurrentUrl();
    this.tabService.tabDetails(this.tabs).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        if (res.pageName === this.pageName) {
          const tabCount = this.tabs._tabs.length;
          this.tabs.selectedIndex = (res.tabIndex) % tabCount;
        }
      }
    });
  }

  ngOnInit() {

    this.can_update = this.isProfile === 1 || (this.permission > 1 && this.currentUser.RoleType != 2);

    if (this.permission <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }

    this.fillCountry();
    this.fillPartner();
    this.fillCurrency();
    if (this.isProfile === 0) {
      this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
        this.id = +param.get('id') | 0;
        this.resetForm();
      });
    } else {
      this.resetForm();
    }
  }

  sendActiveTabInfo(event) {
    console.log(event.tab.textLabel)
    switch (event.tab.textLabel) {
      case 'Institution':
        this.institutionInfo = 'Institution';
        break;
      case 'Agreement':
        this.agreementInfo = 'Agreement';
        break;
      case 'Reference':
        this.referenceInfo = 'Reference';
        break;
      case 'Document':
        this.documentInfo = 'Document';
        break;
      case 'Evaluation Form':
        this.evalFormInfo = 'Evaluation Form';
        break;
      case 'Users':
        this.activityUserInfo= 'Users';
        break;
      // case 'Associated Institutes':
      //   this.associateInstInfo = 'Associated Institutes';
      case 'Activity':
        this.activityAgenttInfo = 'Activity';
        break;
      case 'Agent Activity Log':
        this.activityAgentLogInfo = 'Agent Activity Log';
        break;
        case 'Branch':
        this.branchInfo = 'Branch';
        break;

    }
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  fillCurrency() {
    this.miscService.currency().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.currencyList = res;
    });
  }

  fillPartner() {
    this.miscService.ForDDLForPartner().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.partnerList = res;
    });
  }

  fillProvince(countryId,reset?:boolean) {
    if(reset){
      this.formdata.Province=null;
    }
    if (!countryId) { return; }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceList = res;
      });
  }

  fillPrimContProvince(countryId,reset?:boolean) {
    if(reset){
      this.formdata.PrimContProvince=null;
    }
    if (!countryId) { return; }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceListForPrimCont = res;
      });
  }
  fillSecondContProvince(countryId,reset?:boolean) {
    if(reset){
      this.formdata.SecondContProvince=null;
    }
    if (!countryId) { return; }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceListForSecondCont = res;
      });
  }
  fillDirectorContProvince(countryId,reset?:boolean) {
    if(reset){
      this.formdata.DirectorContProvince=null;
    }
    if (!countryId) { return; }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceListForDirectorCont = res;
      });
  }

  resetForm() {
    this.formdata = {
      AgentId: this.id,
      AccountName: '',
      AccountNo: '',
      AddUserId: this.currentUser.UserId,
      AgentStatus: 0,
      BankAddress: '',
      BankName: '',
      City: '',
      Comment: '',
      CompanyName: '',
      Country: 0,
      PartnerTypeId: 2,
      CountryOfBusiness: 0,
      Email: '',
      InstitutionNo: '',
      LegalFirstName: '',
      LegalLastName: '',
      PhoneNo: '',
      PhoneNo1: '',
      Province: '',
      SkypeId: '',
      StreetAddress: '',
      TransitNo: '',
      Website: '',
      WhatsappId: '',
      Zipcode: '',
      IFSCCode: '',
      SwiftCode: '',
      //  RefList:[],
      // Document:[],


      PrimContName: '',
      PrimContSkypeId: '',
      PrimContWhatsappId: '',
      PrimContEmail: '',
      PrimContPhoneNo: '',
      PrimContMobileNo: '',
      PrimContStreetAddress: '',
      PrimContCity: '',
      PrimContProvince: '',
      PrimCoutCountry: 0,
      PrimContZipcode: '',
      SecondContName: '',
      SecondContSkypeId: '',
      SecondContWhatsappId: '',
      SecondContEmail: '',
      SecondContPhoneNo: '',
      SecondContMobileNo: '',
      SecondContStreetAddress: '',
      SecondContCity: '',
      SecondContProvince: '',
      SecondCoutCountry: 0,
      SecondContZipcode: '',
      DirectorContName: '',
      DirectorContSkypeId: '',
      DirectorContWhatsappId: '',
      DirectorContEmail: '',
      DirectorContPhoneNo: '',
      DirectorContMobileNo: '',
      DirectorContStreetAddress: '',
      DirectorContCity: '',
      DirectorContProvince: '',
      DirectorCoutCountry: 0,
      DirectorContZipcode: '',

      BranchName: '',
      BranchNo: '',
      PanNo: '',
      currency: ''

    }
    // this.getMissingDoc();
    if (this.id > 0) {
      this.getAgent();
      this.listStatus();
      this.listActivity();
    }
  }


  onSubmit(form: NgForm) {
    const invalidFields = [];
    if (form && !form.valid) {
      this.mandatoryfieldCheckService.setinvalidFields();
      return;
    }
    this.flagdisabled = true;



    if (this.id === 0) {
      this.agentService.add(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (+res > 0) {
            this.toasterService.pop('success', 'Agent saved successfully');
            this.router.navigate(['member/agents'])
          }
        });
    } else {
      this.agentService.update(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (+res > 0) {
            if (this.isProfile === 0) {
              this.toasterService.pop('success', 'Agent updated successfully');
              this.router.navigate(['member/agents']);
            } else {
              this.flagdisabled = false;
              this.toasterService.pop('success', 'Profile updated successfully');
              if (this.currentUser.RoleId === 2) {
                this.commonService.profileFormStatus.next(this.formStatus.valid);
                this.profileFormStatus = this.formStatus.valid;
              }
            }
          }
        });
    }

  }
  getHoverTitles(contryName) {

    if (this.overTitlesshow.indexOf(contryName) === -1) {
      this.overTitlesshow.push(contryName)
    } else {
      const index: number = this.overTitlesshow.indexOf(contryName);
      if (index !== -1) {
        this.overTitlesshow.splice(index, 1);
      }
    }

  }

  uploadedDocument(event) {
    if (event.documentTypeId && event.documentTypeId !== 15) {
      return;
    }
    if (event.message === 'saved') {
      this.onDocumentUploadService.businessCertificate.next(false);
    } else {
      this.onDocumentUploadService.businessCertificate.next(true);
    }

  }

  getAgent() {
    this.agentService.get(this.id)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
        this.tempArr=JSON.stringify(res)
        this.preEmailid = res.Email;
        this.fillProvince(this.formdata.Country,false);
        this.fillPrimContProvince(this.formdata.PrimCoutCountry,false);
        this.fillSecondContProvince(this.formdata.SecondCoutCountry,false);
        this.fillDirectorContProvince(this.formdata.DirectorCoutCountry,false);
        this.replydata.StatusId = this.formdata.AgentStatus;
        this.btnLabel = 'Update';
       
        this.getFilesDocument(this.formdata.Country, this.formdata.Province)
        this.subTitleService.name.next(this.formdata.CompanyName);
        if (this.currentUser.RoleId === 2) {
         
          setTimeout(() => {
         
            this.commonService.profileFormStatus.next(this.formStatus.valid);
            this.profileFormStatus = this.formStatus.valid;
          }, 1000);

        }



      });
  }

  isFormValueUpdated()
  {

    if(JSON.stringify(this.formdata)===this.tempArr)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
  getFilesDocument(country, Province) {
  
    if(Province==undefined)
    {
      Province=null;
    }
    if (country) {
      this.documentList = []
      this.agentDocument.listForApplication(country, Province).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        
        this.documentList = res;
      })
    }
  }

  fillCountry() {
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
      });
  }


  onReply() {
    this.replydata.ApplicationId = this.id;
    this.activityService.add(this.replydata)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Query saved successfully');
        this.replydata.Remark = '';

        this.listActivity();
      });
  }


  listActivity() {
    this.activityService.list(2, this.id)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.activityList = res;
      })
  }
  onTabPanelClick(evt, tab) {
    this.sendActiveTabInfo(evt);
    console.log(evt)
    this.tabService.getTab(evt.index, this.pageName);

  }

  listStatus() {
    this.miscService.statuslist(2, this.currentUser.RoleId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.agentStatusList = res;
      });
  }

}
