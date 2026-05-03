import { Component, OnInit, OnChanges, AfterViewInit, Input, Output, EventEmitter, ViewChild, SimpleChange, OnDestroy } from '@angular/core';
import { Country } from 'app/models/country-model';
import { FormGroup, NgForm } from '@angular/forms';
import { appPattern, enumToArray, leadSource, leadStatus, parentType } from 'app/models/site-map.model';
import { MiscService } from 'app/services/misc.service';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { ApplicationService } from 'app/services/application.service';
import { UserService } from 'app/services/user.service';
import { MSMAgentService } from 'app/services/msmagent.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProgramService } from 'app/services/program.service';
import { InstituteService } from 'app/services/institute.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { ProgramFeeService } from 'app/services/program-fee.service';
import { Login } from 'app/models/login.model';
import { MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
@Component({
  selector: 'app-student-create-layout',
  templateUrl: './student-create-layout.component.html',
  styleUrls: ['./student-create-layout.component.scss']
})
export class StudentCreateLayoutComponent implements OnInit, OnChanges, OnDestroy {

  sameMailingAddres: boolean = false;
  tabindex: number = 2;
  instFilter: any = '';
  programFilter: any = '';
  marketFilter: any = '';
  counselorFilter: any = '';
  agentFilter: any = '';
  countryFilter: any = '';
  countyFilter: any = '';
  contyFilter: any = '';
  provinceFilter: any = '';
  mailingProvinceFilter: any = '';
  emergencyProvinceFilter: any = '';
  firstLanFilter: any = '';
  statusFilter: any = '';
  countryCitzFilter: any = '';
  sourceFilter: any = '';
  modeFilter: any = '';
  specializationFilter: any = '';
  campusFilter: any = '';
  intakeFilter: any = '';
  adminFilter: any = '';
  @Input()
  formdata: any;
  @Input()
  flagDisabled: boolean = false;

  @Output() onSubmitClick = new EventEmitter<any>();

  // @Input()
  // _genInfoData: any;
  private _genInfoData;
  @Input()
  set genInfoData(value) {
   this._genInfoData = value;
  //  this.fillProvince(this._genInfoData.Country);
   this._genInfoData.Province=value.Province;
   this._genInfoData.EmergencyProvince=value.EmergencyProvince;
   this._genInfoData.MailingProvince=value.MailingProvince;
  }


  get genInfoData() {
   return this._genInfoData
   }

  baseGenInfoData: any;

  @Output()
  onGenInfoSubmit: EventEmitter<any> = new EventEmitter();

  @Input()
  programInfoData: any;

  baseProgramInfoData: any;

  @Output()
  onProgramInfoSubmit: EventEmitter<any> = new EventEmitter();

  @Input()
  btnLabel: string = "Submit";

  @Input()
  permission: number = 0;

  @Input()
  mode: number = 0; // 0 = student , 1=edit application 2= new application 3=lead

  @Input()
  parentId: number;

  @Input()
  parentType: number; // 6 Student+Lead,7 Application

  @Input()
  program: any;

  @Input()
  statusName: string = '';

  // minDob: Date = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
  // Min   age need to be more than 13 years.
  minDob: Date = new Date(new Date().setMonth(new Date().getMonth() - 156));
  today: Date = new Date();

  citizenCountryList: Country[];


  countryList: Country[];
  provinceList: any;
  provinceListForMailing: any;
  provinceListForEmergency: any;

  languageList: any[];
  intekList: any[];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  counselorList: any[];

  agentList: any[];

  institutionList: any[];
  programList: any[];

  modelPattern = appPattern;

  leadSourceList = enumToArray(leadSource);
  leadStatusList = enumToArray(leadStatus);

  feeList: any[];


  marketingManagerList: any[];
  admissionExecutiveList: any[];

  prePassportNo: string = '';

  campusList: any[];

  programModeList: any[];

  specializationList;

  @ViewChild('intekform', { static: false }) intekform: NgForm;

  @ViewChild('geneform', { static: false }) geneform: NgForm;

  user: Login;
  OnShore;
  OffShore;
  SubmissionDeadline;
  OnshoreSubmissionDeadline;


  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private miscService: MiscService,
    private programIntekService: ProgramIntekService,
    private applicatoinService: ApplicationService,
    private userService: UserService,
    private agentService: MSMAgentService,
    authService: AuthenticationService,
    private programService: ProgramService,
    private institutionService: InstituteService,
    private institutionCountryService: InstCountryService,
    private toasterService: ToasterService,
    private programFeeService: ProgramFeeService,
    private mandatoryfieldCheckService: MandatoryfieldCheckService,

  ) {
    this.user = authService.currentUserSubject.getValue();
  }

  ngOnInit() {
    this._genInfoData.Country = this._genInfoData.Country == 0 ? null : this._genInfoData.Country;
    // agent list not fill for Agent Login
    if (this.user.RoleId != 2) {
      this.fillAgentList();
    }
    if (+this.parentType === 7) {
      this.fillCounselor(false);
    }

    this.fillCountry();   
    this.fillLanguage();

    if (+this.parentType === 7) {

      this.institutionService.forDDL()
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => { this.institutionList = res; });

      if (this.user.RoleType === 1) {
        this.userService.forDDLByRoleType("", "", 0, 0, "1", "")
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.marketingManagerList = res;
            this.admissionExecutiveList = res;
          });
      }
    }
  }
  changetitle(evt) {
    this._genInfoData.Gender = evt.value === "Mr." ? 'Male' : 'Female';
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngAfterContentChecked() {
    if (this.permission <= 1) {
      if (this.intekform) {
        this.intekform.form.disable();
      }
      if (this.geneform) {
        this.geneform.form.disable();
      }
    }
  }

  updateBaseGenInfoData() {
    this.prePassportNo = this._genInfoData.PassportNo;
    this.baseGenInfoData = JSON.parse(JSON.stringify(this._genInfoData));
  }


  updateBaseProgramInfoData() {
    this.baseProgramInfoData = JSON.parse(JSON.stringify(this.programInfoData));
  }


  ngOnChanges(changes: { [propName: string]: SimpleChange }) {


    if (changes['_genInfoData'] && changes['_genInfoData'].previousValue != changes['_genInfoData'].currentValue) {
      this.updateBaseGenInfoData();
      if (changes['_genInfoData'].currentValue && changes['_genInfoData'].currentValue.AgentId && (!changes['_genInfoData'].previousValue || changes['_genInfoData'].currentValue.AgentId != changes['_genInfoData'].previousValue.AgentId)) {
        this.fillCounselor(false);
      }

      if (changes['_genInfoData'].currentValue && changes['_genInfoData'].currentValue.Citizenship && (!changes['_genInfoData'].previousValue || changes['_genInfoData'].currentValue.Citizenship != changes['_genInfoData'].previousValue.Citizenship)) {
        this.fillFeeList();
      }
    }


    if (changes['programInfoData'] && changes['programInfoData'].previousValue != changes['programInfoData'].currentValue) {
      this.updateBaseProgramInfoData();
      this.fillIntek(false);

      if (changes['programInfoData'].currentValue && changes['programInfoData'].currentValue.InstitutionId && (!changes['programInfoData'].previousValue || changes['programInfoData'].currentValue.InstitutionId != changes['programInfoData'].previousValue.InstitutionId)) {
        this.fillProgram(false);
        this.fillCitizenShipCountry();
      }
    }
  }


  fillCounselor(reset: boolean) {
    if (reset) {
      this.counselorList = [];
      this._genInfoData.AssignedTo = null;
    }
    if (this.mode > 0 && this._genInfoData.AgentId > 0) {
      this.userService.forDDLByAgent('2', '', this._genInfoData.AgentId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.counselorList = res;
        });
    }
  }

  fillCitizenShipCountry() {
    if (+this.parentType === 7) {
      this.citizenCountryList = [];
      var baseCountryid = this._genInfoData.Citizenship;
      if (this.programInfoData && this.programInfoData.IntekId > 0) {
        this.institutionCountryService.forApplication(this.programInfoData.IntekId)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.citizenCountryList = res;

            if (baseCountryid > 0) {
              if (!this.citizenCountryList.find(d => +d.CountryId === +baseCountryid)) {
                this._genInfoData.Citizenship = 0;
              }
            }
          });
      }
    }

  }



  fillCountry() {
    //this.provinceList = [];
    this.countryList = [];
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
        this.fillProvince(this._genInfoData.Country,false);
        this.fillProvinceForMailing(this._genInfoData.MailingCountry,false);
        this.fillProvinceForEmergency(this._genInfoData.EmergencyCountry,false);
        if (this.parentType != 7) {
          this.citizenCountryList = this.countryList;
        }
      });
  }

  fillProvince(countryId,reset?:boolean) {
    if(reset){this.genInfoData.Province=null}
    this.provinceList = [];
    if (!countryId) { return; }

    if(this.genInfoData.MailingAddressSame) {
      this.genInfoData.MailingCountry = this.genInfoData.Country;
      this.genInfoData.EmergencyCountry = this.genInfoData.Country;
      this.fillProvinceForMailing(this.genInfoData.Country);
      this.fillProvinceForEmergency(this.genInfoData.Country);
    }

    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceList = res;
      });
  }

  fillProvinceForMailing(countryId,reset?:boolean) {
    if(reset){this.genInfoData.MailingProvince=null}
    if (!countryId) { return; }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceListForMailing = res;
      });
  }

  fillProvinceForEmergency(countryId,reset?:boolean) {
    if(reset){this.genInfoData.EmergencyProvince=null}
    if (!countryId) { return; }

    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceListForEmergency = res;
      });
  }



  onSubmit(form: NgForm, stepper?: MatStepper) {
    if (form.valid) {
      this.flagDisabled = true;
      if (this._genInfoData.AgentId === 0 && this.user.RoleId === 2) {
        this._genInfoData.AgentId = this.user.RefId;
      }
      this.onSubmitClick.emit({ genInfo: this._genInfoData, programInfo: this.programInfoData });
    } else {
      this.mandatoryfieldCheckService.setinvalidFields();
    }
  }

  isEqual(a: any, b: any): boolean {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    catch (e) {
      return false;
    }
  }

  onGenInfoFormSubmit(form: NgForm, stepper?: MatStepper) {
    if (form.valid) {
      if (!this.isEqual(this._genInfoData, this.baseGenInfoData)) {
        if (this._genInfoData.AgentId === 0 && this.user.RoleId === 2) {
          this._genInfoData.AgentId = this.user.RefId;
        }
        this.onGenInfoSubmit.emit(this._genInfoData);
        this.updateBaseGenInfoData();
      }


      if (stepper) {
        stepper.next();
      }
    } else {
      this.mandatoryfieldCheckService.setinvalidFields();
    }
  }



  onProgramFormSubmit(form: NgForm, stepper?: MatStepper) {
    if (form.valid) {
      if (!this.isEqual(this.programInfoData, this.baseProgramInfoData)) {
        this.onProgramInfoSubmit.emit(this.programInfoData);
        this.updateBaseProgramInfoData();
      }

      if (stepper) {
        stepper.next();
      }
    }
  }

  fillLanguage() {
    this.miscService.language()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.languageList = res;
      });
  }


  onIntakeChange(reset?:boolean) {
    if(reset)
    {
      this.programInfoData.ShoreType=null;
      this.programInfoData.Campus=null;
    }
    this.applicatoinService.checkInstitutionIntakeExists(this._genInfoData.StudentId, this.programInfoData.InstitutionId,  this.programInfoData.ProgramId, this.programInfoData.IntekId)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      console.log(res);
      if (res > 0 && res != this.parentId) {
        this.toasterService.pop('error', 'Another application already exists in this intake')
      }
    });
    
    try {
      if (this.program) {
        this.SubmissionDeadline = this.intekList.filter(d => d.IntekId === this.programInfoData.IntekId)[0].SubmissionDeadline;
        this.OnshoreSubmissionDeadline = this.intekList.filter(d => d.IntekId === this.programInfoData.IntekId)[0].OnshoreSubmissionDeadline;

        this.OnShore = this.intekList.filter(d => d.IntekId === this.programInfoData.IntekId)[0].OnShore;
        this.OffShore = this.intekList.filter(d => d.IntekId === this.programInfoData.IntekId)[0].OffShore;

        if(this.OffShore == true && this.OnShore == false) { this.programInfoData.ShoreType = 0}
        if(this.OnShore == true && this.OffShore == false) { this.programInfoData.ShoreType = 1}

      }
      this.fillCitizenShipCountry();
      this.fillFeeList();
      this.fillCampus(false);
    }
    catch (e) {
      this.program.SubmissionDeadline = '';
    }
  }

  fillAgentList() {
    // no need to fill agent list
    if (this.user.RoleType != 0) {
      if (this.parentType == parentType.Application) {
        this.agentList = [];
        if (this.programInfoData && this.programInfoData.InstitutionId > 0) {
          this.agentService.forDDLForApplication(this.programInfoData.InstitutionId)
            .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              this.agentList = res;
            });
        }
      }
      else {
        this.agentService.ForDDLForStudent()
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.agentList = res;
          });
      }
    }
  }

  fillProgram(reset: boolean) {
    this.programList = [];

    if (reset) {
      this.programInfoData.ProgramId = 0;
    }

    if (this.programInfoData) {
      if ((this.programInfoData.InstitutionId && this.programInfoData.InstitutionId > 0)) {
        this.programService.forDDL(this.programInfoData.InstitutionId)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.programList = res;
          });

        this.onProgramChange(reset);
      }
    }
  }

  fillIntek(reset: boolean) {
    this.intekList = [];
    if (reset) {
      this.programInfoData.IntekId = 0;
      this.getProgramDetail();
    }

    if (this.programInfoData) {
      if (this.programInfoData.ProgramId && this.programInfoData.ProgramId > 0) {
        this.programIntekService.programIntakeForApplication(this.programInfoData.ProgramId, this.parentId, this.programInfoData.Citizenship)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.intekList = res;
            this.onIntakeChange(false);
          });
      }
    }
  }




  fillFeeList() {
    this.feeList = [];
    if (this.programInfoData && this.programInfoData.IntekId > 0) {
      this.programFeeService.forApplication({ IntakeId: this.programInfoData.IntekId, Nationality: this._genInfoData.Citizenship, ApplicationId: this.parentId })
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.feeList = res;
        });
    }
  }




  onInstitutionChange() {
    this.programList = [];
    this.fillAgentList();   
      this.fillProgram(true);
      this.fillCitizenShipCountry();
  }

  fillCampus(reset?: boolean) {
    if (reset) {
    
      this.programInfoData.Campus = null;
    }
    if (this.programInfoData && this.programInfoData.IntekId > 0) {
     
      this.programIntekService.campusList(this.programInfoData.IntekId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.campusList = res;
        });
    }
  }
  fillMode(reset?: boolean) {
    if (reset) {
      this.programInfoData.ApplicationMode = null;
    }
    if (this.programInfoData && this.programInfoData.ProgramId > 0) {
      this.programService.mode(this.programInfoData.ProgramId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.programModeList = res;

          //if only 1 mode available in program then set as selected
          if (this.programModeList.length === 1) {
            this.programInfoData.ApplicationMode = this.programModeList[0].ModeId;
            return;
          }

          //if previousaly selected mode available in changed program mode then set
          if (this.programInfoData.ApplicationMode != null || this.programInfoData.ApplicationMode != undefined) {
            if (!this.programModeList.find(d => d.ModeId === this.programInfoData.ApplicationMode)) {
              this.programInfoData.ApplicationMode = null;
            }
          }

          // set full time as default selected if available in program
          if (this.programInfoData.ApplicationMode === null || this.programInfoData.ApplicationMode === undefined) {
            if (this.programModeList.find(d => d.ModeId === 1)) {
              this.programInfoData.ApplicationMode = 1;
            }
          }
        });
    }
  }

  onProgramChange(reset?: boolean) {
    this.fillIntek(reset);
    this.campusList = [];
    this.programModeList = [];
    if (reset) {

      this.programInfoData.Campus = null;
      this.programInfoData.ApplicationMode = null;
    }

//    this.fillCampus(reset);
    this.fillMode(reset);
    this.getSpecializationList(reset);

  }

  getProgramDetail() {
    this.program = {};
    if (this.programInfoData.ProgramId && this.programInfoData.ProgramId > 0) {
      this.programService.getdetail(this.programInfoData.ProgramId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.program = res;
        });
    }
  }
  getSpecializationList(reset?: boolean) {
    if (reset) {
      this.programInfoData.SpecializationId = null;
    }
    this.specializationList = null;
    if (this.programInfoData.ProgramId && this.programInfoData.ProgramId > 0) {
      this.programService.getSpecializationList(this.programInfoData.ProgramId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.specializationList = res;
          // if (this.specializationList.length == 1) {
          //   this.programInfoData.SpecializationId = this.specializationList[0].SpecializationId;
          // }
        });
    }

  }

  checkValue(e) {
    if (e.checked) {
      this.fillProvinceForMailing(this._genInfoData.Country);
      this._genInfoData.MailingAddres = this._genInfoData.Addres;
      this._genInfoData.MailingCountry = this._genInfoData.Country;
      this._genInfoData.MailingProvince = this._genInfoData.Province;
       this.fillProvinceForMailing(this._genInfoData.Country);
      this._genInfoData.MailingCity = this._genInfoData.City;
      this._genInfoData.MailingPincode = this._genInfoData.Pincode;
      this.geneform.controls['MailingAddres'].disable();
      this.geneform.controls['MailingCountry'].disable();
      this.geneform.controls['MailingProvince'].disable();
      this.geneform.controls['MailingCity'].disable();
      this.geneform.controls['MailingPincode'].disable();
    }
    else {
      this._genInfoData.MailingAddres = '';
      this._genInfoData.MailingCountry = '';
      this._genInfoData.MailingProvince = '';
      this._genInfoData.MailingCity = '';
      this._genInfoData.MailingPincode = '';
      this.geneform.controls['MailingAddres'].enable();
      this.geneform.controls['MailingCountry'].enable();
      this.geneform.controls['MailingProvince'].enable();
      this.geneform.controls['MailingCity'].enable();
      this.geneform.controls['MailingPincode'].enable();

    }
  }

  checkEmergencyValue(e) {
    if (e.checked) {
      this.fillProvinceForEmergency(this._genInfoData.MailingCountry);
      this._genInfoData.EmergencyAddress = this._genInfoData.MailingAddres
      this._genInfoData.EmergencyCountry = this._genInfoData.MailingCountry;
      this._genInfoData.EmergencyProvince = this._genInfoData.MailingProvince;
      this._genInfoData.EmergencyCity = this._genInfoData.MailingCity;
      this._genInfoData.EmergencyPincode = this._genInfoData.MailingPincode;

      this.geneform.controls['EmergencyAddress'].disable();
      this.geneform.controls['EmergencyCountry'].disable();
      this.geneform.controls['EmergencyProvince'].disable();
      this.geneform.controls['EmergencyCity'].disable();
      this.geneform.controls['EmergencyPincode'].disable();

    }
    else {
      this._genInfoData.EmergencyAddress = '';
      this._genInfoData.EmergencyCountry = '';
      this._genInfoData.EmergencyProvince = '';
      this._genInfoData.EmergencyCity = '';
      this._genInfoData.EmergencyPincode = '';
      this.geneform.controls['EmergencyAddress'].enable();
      this.geneform.controls['EmergencyCountry'].enable();
      this.geneform.controls['EmergencyProvince'].enable();
      this.geneform.controls['EmergencyCity'].enable();
      this.geneform.controls['EmergencyPincode'].enable();
    }
  }

  isResidentialSameAsMailing() {
     
    this.fillProvinceForMailing(this._genInfoData.Country);
    if (this._genInfoData.MailingAddres == this._genInfoData.Addres &&
      this._genInfoData.MailingCountry == this._genInfoData.Country &&
      this._genInfoData.MailingProvince == this._genInfoData.Province &&
      this._genInfoData.MailingCity == this._genInfoData.City &&
      this._genInfoData.MailingPincode == this._genInfoData.Pincode) {
      this.sameMailingAddres = true;
    }
    else {
      this.sameMailingAddres = false;
    }
  }


  resetShoreType(reset)
  {
   
    if(reset)
    {
       
      this.programInfoData.ShoreType='';
    }
  }

  matchAddress(param: string) {
    if(this.genInfoData.MailingAddressSame) {
      switch(param) {
        case 'address':
          this.genInfoData.MailingAddres = this.genInfoData.Addres;
          break;
        case 'province':
          this.genInfoData.MailingProvince = this.genInfoData.Province;
          break;
        case 'city':
          this.genInfoData.MailingCity = this.genInfoData.City;
          break;
        case 'pin':
          this.genInfoData.MailingPincode = this.genInfoData.Pincode;
          break;
      }
    }
    if(this.genInfoData.EmergencyAddressSame) {
      switch(param) {
        case 'address':
          this.genInfoData.EmergencyAddress = this.genInfoData.Addres;
          break;
        case 'province':
          this.genInfoData.EmergencyProvince = this.genInfoData.Province;
          break;
        case 'city':
          this.genInfoData.EmergencyCity = this.genInfoData.City;
          break;
        case 'pin':
          this.genInfoData.EmergencyPincode = this.genInfoData.Pincode;
          break;
      }
    }
  }

}
