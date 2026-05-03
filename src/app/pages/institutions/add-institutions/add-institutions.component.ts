import { Component, OnDestroy, OnInit, ViewChild , AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Institute } from 'app/models/institution-model';
import { InstituteService } from 'app/services/institute.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Country } from 'app/models/country-model';
import { Province } from 'app/models/province-model';
import { City } from 'app/models/city-model';
import { InstType } from 'app/models/inst-type.model';
import { MiscService } from 'app/services/misc.service';
import { UploadService } from 'app/services/upload.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { sitemap, appPattern, editorlist } from 'app/models/site-map.model';
import { InvoiceService } from 'app/services/invoice.service';
import { SubTitleService } from 'app/services/sub-title.service';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MatTabGroup } from '@angular/material/tabs';
import {  TabService} from 'app/services/tab-service';
import { PreviousRouteService } from 'app/services/previousPath.service';
import { log } from 'console';
@Component({
  selector: 'app-add-institutions',
  templateUrl: './add-institutions.component.html',
  styleUrls: ['./add-institutions.component.scss']
})
export class AddInstitutionsComponent implements OnInit, OnDestroy,AfterViewInit  {

  tempArr:any;
  btnLabel: string = "Save";
  logoFile: File;
  imageFile: File;
  letterheadFile: File;
  cntyFilter: any = '';
  provinceFilter: any = '';
  instituteAgentInfo:any='';
  cityFilter: any = '';
  instFilter: any = '';
  cnyFilter: any = '';
  partnerFilter:any ='';
  invoiceFilter: any = '';
  id: number;
  formdata: Institute;
  countryList: Country[];
  provinceList: Province[];
  cityList: City[];
  instType: InstType[];
  currencyList: string[];
  formatList: any[];
  currentUser: Login;
  viewItem: any;
  permission: number = 0;
  flagdisabled: boolean = false;
  currentyear = new Date().getFullYear();
  agreementPermission: number = 0;
  popupVisibleInstAbout: boolean;
  popupVisibleInstFeature: boolean;
  pageName:string = '';
  instituteIntakeInfo:any = '';
  items: any = Object.assign([], editorlist);
  featureItems: any = Object.assign([], editorlist);
  @ViewChild('form', { static: true }) form: NgForm;
  partnerList :any=[];
  previousUrl:any;
  instituteUserInfo:any;
  parentName: string = 'Institution';
  modelPattern = appPattern;
  @ViewChild('matTab' , {static:false} ) tabs :MatTabGroup;


  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private instService: InstituteService,
    private route: ActivatedRoute,
    private router: Router,
    private miscService: MiscService,
    private uploadService: UploadService,
    private authService: AuthenticationService,
    private toasterService: ToasterService,
    private invoiceService: InvoiceService,
    private subTitleService: SubTitleService,
    private  location :Location,
    private mandatoryfieldCheckService: MandatoryfieldCheckService,
    private tabService : TabService,
    private previousRouteService: PreviousRouteService
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();

  }
  ngAfterViewInit() {
    this.previousUrl = this.previousRouteService.getPreviousUrl();
    this.pageName =  this.previousRouteService.getCurrentUrl();
    this.tabService.tabDetails(this.tabs).pipe(takeUntil(this.onDestroy$)).subscribe(res =>{
      if(res)
      {
        if(res.pageName === this.pageName){
          const tabCount = this.tabs._tabs.length;
         this.tabs.selectedIndex =(res.tabIndex )% tabCount;
        }
      }
    });
  
  }
 


  ngOnInit() {
    
    if(this.currentUser.RoleType===2)
    {
      this.permission = this.authService.checkPermission(sitemap.Institute_Detail);
    }
    else
    {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }
    this.agreementPermission = this.authService.checkPermission(sitemap.Institution_Agreement);

    if (this.agreementPermission < 3) {
      this.agreementPermission = 0;
    }

    this.items.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => (this.popupVisibleInstAbout = true),
    });
    this.featureItems.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => (this.popupVisibleInstFeature = true),
    });


    if (this.permission <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }



    this.fillCountry();
    this.fillInstType();
    this.fillCurrency();
    this.fillInoviceFormat();
    this.getPartnerList();

    if (this.currentUser.RoleType === 2) {
      this.id = this.currentUser.RefId;
      this.resetForm(null);
    } else {

      this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
        this.id = +param.get("id") | 0;
        this.resetForm(null);
      });
    }
  }

  ngAfterContentChecked() {
    if (this.permission <= 1) {
      this.form.form.disable();
    }
  }



  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.formdata =
    {
      InstitutionId: 0,
      InstName: "",
      InstAlias: "",
      PartnerTypeId: 2,
      InstLogoPath: "",
      InstImagePath: "",
      InstAddress1: "",
      InstAddress2: "",
      InstCity: 0,
      InstProvince: 0,
      InstCountry: 0,
      InstZipCode: "",
      InstAbout: "",
      InstType: 0,
      InstFounded: "",
      InstTotalStudents: 0,
      InstLocationGEOcode: "",
      InstAvgCostTuition_Year: '',
      InstCostofLiving_Year: '',
      AddUserId: this.currentUser.UserId,
      InstCityName: "",
      InstCountryName: "",
      InstTypeName: "",
      InstApplicationFee: '',
      DLINo: '',
      InstFeatures: '',
      InstCurrency: '',
      PaymentLink: '',
      Website: '',
      InvoiceFormat: '',
      LetterHeadPath: ''
    }

    if (!(this.id === 0)) {
      this.getInstitute();
    }
  }



  onSubmit(form: NgForm) {

    if (form && form.invalid) {
      this.mandatoryfieldCheckService.setinvalidFields();
      return;
    }
    this.flagdisabled = true;
    this.formdata.AddUserId = this.currentUser.UserId;
    if (this.logoFile != undefined) {
      this.uploadService.uploadFileWithoutProgress('institution', this.logoFile).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata.InstLogoPath = res[0];
        this.logoFile = undefined;
        this.onSubmit(form);
      },
        err => {
          this.logoFile = undefined;
          this.onSubmit(form);
        }
      );
      return;
    }

    if (this.imageFile != undefined) {
      this.uploadService.uploadFileWithoutProgress('institution', this.imageFile).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata.InstImagePath = res[0];
        this.imageFile = undefined;
        this.onSubmit(form);
      },
        err => {
          //alert('Image Upload fail');
          this.imageFile = undefined;
          this.onSubmit(form);
        }
      );
      return;
    }

    if (this.letterheadFile != undefined) {
      this.uploadService.uploadFileWithoutProgress('institution', this.letterheadFile).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata.LetterHeadPath = res[0];
        this.letterheadFile = undefined;
        this.onSubmit(form);
      },
        err => {
          // alert('Letterhead Upload fail');
          this.letterheadFile = undefined;
          this.onSubmit(form);
        }
      );
      return;
    }


    if (this.id === 0) {
      this.instService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.flagdisabled = false;
        this.toasterService.pop("success", "Institution saved successfully");
        this.router.navigate(["member/institutions/edit-institutions", res]);
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {
      this.instService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.flagdisabled = false;
        this.toasterService.pop("success", "Institution updated successfully");
        if(this.currentUser.RoleType != 2) {
          this.router.navigate(["member/institutions"])
        }    
      }, err => {
        this.flagdisabled = false;
      });
    }
  }

  getInstitute() {
    this.instService.get(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.btnLabel = "Update";
      this.formdata = res as Institute;
      this.tempArr=JSON.stringify(res as Institute);
      this.formdata.InstitutionId = this.id;
      this.subTitleService.name.next(this.formdata.InstName);
      this.fillProvince(false);
      this.fillCity(false);
    });
  }


  fillCountry() {
    this.miscService.country().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res;
    });
  }
  getPartnerList(){
    this.miscService.ForDDLForPartner().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.partnerList = res;
    });
  }

  fillProvince(value) {
    this.cityList = [];
    this.provinceList = [];
      if(value){
        this.formdata.InstCity = 0;
        this.formdata.InstProvince =0;
      }
    if(this.formdata.InstCountry){
    this.miscService.province(this.formdata.InstCountry).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.provinceList = res;
  
    });
  }
  }
  openInNewTab() {
    window.open(this.location.prepareExternalUrl('/institutions/institutions-details/' + this.id))
  }

  fillCity(value) {
    this.cityList = [];
    if(value){
      this.formdata.InstCity = 0;
    }
    if(this.formdata.InstProvince){
    this.miscService.city(this.formdata.InstProvince).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.cityList = res;
    });
  }
  }

  fillInstType() {
    this.miscService.instituionType().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.instType = res;
    });
  }

  fillCurrency() {
    this.miscService.currency().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.currencyList = res;
    });
  }
  fillInoviceFormat() {
    this.invoiceService.invoiceFormatAll().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formatList = res;
    })
  }
  onTabPanelClick(evt, tab){
    this.sendActiveTabInfo(evt);
    this.tabService.getTab(evt.index  , this.pageName);
   
  }



  logoChange(fileInput: any) {
    this.logoFile = <File>fileInput.target.files[0];
  }

  imageChange(fileInput: any) {
    this.imageFile = <File>fileInput.target.files[0];
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

  sendActiveTabInfo(event) {
    switch (event.tab.textLabel) {
      case 'Users':
        this.instituteUserInfo= 'Users';
        break;
        case 'Intake':
          this.instituteIntakeInfo= 'Intake';
          break;
          case 'Agent':
            this.instituteAgentInfo= 'Intake';
            break;
    }
  }


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
