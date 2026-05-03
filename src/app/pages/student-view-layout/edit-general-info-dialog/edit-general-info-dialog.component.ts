import { Component, OnInit, AfterViewInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Login } from 'app/models/login.model';
import { enumToArray, leadSource, leadStatus, appPattern } from 'app/models/site-map.model';
import { InstCountryService } from 'app/services/inst-country.service';
import { MiscService } from 'app/services/misc.service';
import { Country } from 'app/models/country-model';
import { ApplicationService } from 'app/services/application.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { StudentService } from 'app/services/student.service';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
import { environment } from '../../../../environments/environment';
import { EncryptionService } from 'app/services/encryption.service';

@Component({
  selector: 'app-edit-general-info-dialog',
  templateUrl: './edit-general-info-dialog.component.html',
  styleUrls: ['./edit-general-info-dialog.component.scss']
})
export class EditGeneralInfoDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  tempArr:any;
  user: Login;
  permission: number;
  sameMailingAddres: boolean = false;
  genInfoData: any;
  @ViewChild("geneform", { static: false }) geneform: NgForm;

  leadSourceList = enumToArray(leadSource);
  leadStatusList = enumToArray(leadStatus);

  prePassportNo: string = '';
  contryFilter: any = '';
  countryFilter: any = '';
  countyFilter: any = '';
  countryCitzFilter: any = '';
  firstLanFilter: any = '';
  statusFilter: any = '';
  sourceFilter: any = '';
  parentType: number;
  citizenCountryList: any[];

  countryList: Country[];
  languageList: any[];

  provinceList: any;
  provinceListForMailing: any;
  provinceListForEmergency: any;
  provinceFilter: any = '';
  mailingProvinceFilter: any = '';
  emergencyProvinceFilter: any = '';
  modelPattern = appPattern;

  title: string = 'Personal information';

  parentId: number;

  intakeId: number;

  //minDob: Date = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
  minExporyDat: Date = new Date();
  // Min   age need to be more than 13 years .
  minDob: Date = new Date(new Date().setMonth(new Date().getMonth() - 156));

  minExpiryDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 6));   // Min 6 months
  maxExpiryDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 120));  // Max 10 years 

  today: Date = new Date();

  mode: number = 0;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private institutionCountryService: InstCountryService,
    private miscService: MiscService,
    private applicatoinService: ApplicationService,
    private studentService: StudentService,
    authService: AuthenticationService,
    private toasterService: ToasterService,
    private matDialogRef: MatDialogRef<EditGeneralInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private mandatoryfieldCheckService: MandatoryfieldCheckService,
    private encryptionService: EncryptionService,
  ) {
    this.user = authService.currentUserSubject.getValue();

    this.parentId = data.parentId;
    this.permission = data.permission;
    this.parentType = data.parentType;
    this.intakeId = data.intakeId;
    this.mode = data.mode;
  }

  ngOnInit() {

  }
  changetitle(evt) {
    this.genInfoData.Gender = evt.value === "Mr." ? 'Male' : 'Female';
  }

  ngAfterViewInit() {
    this.get();
    this.fillCountry();
    this.fillLanguage();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  makeExpiryEmpty(value) {
    if (value.length === 0) {
      this.genInfoData.PassportExpiryDate = "";
    }
  }


  fillCitizenShipCountry() {
    if (+this.parentType === 7) {
      this.citizenCountryList = [];
      var baseCountryid = this.genInfoData.Citizenship;
      if (this.intakeId > 0) {
        this.institutionCountryService.forApplication(this.intakeId)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.citizenCountryList = res;

            if (baseCountryid > 0) {
              if (!this.citizenCountryList.find(d => +d.CountryId === +baseCountryid)) {
                this.genInfoData.Citizenship = 0;
              }
            }
          });
      }
    }
  }

  fillCountry() {
    this.countryList = [];
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
        if (this.parentType != 7) {
          this.citizenCountryList = this.countryList;
        }
      });
  }

  fillLanguage() {
    this.miscService.language().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.languageList = res;
    });
  }

  fillProvince(countryId,reset?:boolean) {

    if(reset)
    {
      this.genInfoData.Province=null;
    }
    if (!countryId) { return; }

    if(this.genInfoData.MailingAddressSame) {
      this.genInfoData.MailingCountry = this.genInfoData.Country;
      this.genInfoData.EmergencyCountry = this.genInfoData.Country;
      this.fillProvinceForMailing(this.genInfoData.Country);
      this.fillProvinceForEmergency(this.genInfoData.Country);
    }

    this.provinceList = [];
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceList = res;
      });
  }
  fillProvinceForMailing(countryId,reset?:boolean) {
    if(reset)
    {
      this.genInfoData.MailingProvince=null;
    }
    if (!countryId) { return; }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceListForMailing = res;
      });
  }
  fillProvinceForEmergency(countryId,reset?:boolean) {
    if(reset)
    {
      this.genInfoData.EmergencyProvince=null;
    }
    if (!countryId) { return; }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceListForEmergency = res;
      });
  }

  onGenInfoFormSubmit(form: NgForm) {
    if (form.valid) {
      if (this.parentType === 7) {
        this.applicatoinService.updateGenInfo(this.genInfoData)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop('success', this.title + ' updated successfully');
            this.matDialogRef.close(true);
          });
      }
      else {
        this.studentService.updateGenInfo(this.genInfoData)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop('success', this.title + ' updated successfully');
            this.matDialogRef.close(true);
          });
      }
    } else {
      this.mandatoryfieldCheckService.setinvalidFields();
    }
  }

  get() {
    if (this.parentType === 7) {
      this.applicatoinService.getSectionWise(this.parentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.genInfoData = res.genInfo;
        this.tempArr=JSON.stringify(res.genInfo);
        //        this.isResidentialSameAsMailing();
        this.genInfoData.App_Password = this.encryptionService.get(environment.encryptp, this.genInfoData.App_Password);
        this.genInfoData.Country = this.genInfoData.Country == 0 ? null : this.genInfoData.Country;
        this.prePassportNo = this.genInfoData.PassportNo;
        this.fillCitizenShipCountry();
        this.fillProvince(this.genInfoData.Country);
        this.fillProvinceForMailing(this.genInfoData.MailingCountry);
        this.fillProvinceForEmergency(this.genInfoData.EmergencyCountry);
      });
    }
    else {
      this.studentService.getSectionWise(this.parentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.genInfoData = res.genInfo;
        this.tempArr=JSON.stringify(res.genInfo);
        //       this.isResidentialSameAsMailing();
        this.genInfoData.Country = this.genInfoData.Country == 0 ? null : this.genInfoData.Country;
        this.prePassportNo = this.genInfoData.PassportNo;
        this.fillProvince(this.genInfoData.Country);
        this.fillProvinceForMailing(this.genInfoData.MailingCountry);
        this.fillProvinceForEmergency(this.genInfoData.EmergencyCountry);
      });
    }
  }

  checkValue(e) {
    if (e.checked) {
      this.fillProvinceForMailing(this.genInfoData.Country);
      this.genInfoData.MailingAddres = this.genInfoData.Addres;
      this.genInfoData.MailingCountry = this.genInfoData.Country;
      this.genInfoData.MailingProvince = this.genInfoData.Province;
      this.fillProvinceForMailing(this.genInfoData.Country);
      this.genInfoData.MailingCity = this.genInfoData.City;
      this.genInfoData.MailingPincode = this.genInfoData.Pincode;
 //     this.makeMailingAddressFormDisabled();
    }
    else {
      this.genInfoData.MailingAddres = '';
      this.genInfoData.MailingCountry = '';
      this.genInfoData.MailingProvince = '';
      this.genInfoData.MailingCity = '';
      this.genInfoData.MailingPincode = '';
   //   this.makeMailingAddressFormEnabled();
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

  checkEmergencyValue(e) {
    if (e.checked) {
      this.fillProvinceForEmergency(this.genInfoData.MailingCountry);
      this.genInfoData.EmergencyAddress = this.genInfoData.MailingAddres
      this.genInfoData.EmergencyCountry = this.genInfoData.MailingCountry;
      this.genInfoData.EmergencyProvince = this.genInfoData.MailingProvince;
      this.genInfoData.EmergencyCity = this.genInfoData.MailingCity;
      this.genInfoData.EmergencyPincode = this.genInfoData.MailingPincode;
//      this.makeEmergencyAddressDisabled();
    }
    else {
      this.genInfoData.EmergencyAddress = '';
      this.genInfoData.EmergencyCountry = '';
      this.genInfoData.EmergencyProvince = '';
      this.genInfoData.EmergencyCity = '';
      this.genInfoData.EmergencyPincode = '';
      // this.makeMailingAddressFormEnabled();
    }
  }

  isResidentialSameAsMailing() {
    this.fillProvinceForMailing(this.genInfoData.Country);
    if (this.genInfoData.MailingAddres == this.genInfoData.Addres &&
      this.genInfoData.MailingCountry == this.genInfoData.Country &&
      this.genInfoData.MailingProvince == this.genInfoData.Province &&
      this.genInfoData.MailingCity == this.genInfoData.City &&
      this.genInfoData.MailingPincode == this.genInfoData.Pincode) {
      this.sameMailingAddres = true;
    }
    else {
      this.sameMailingAddres = false;
    }
  }

  isFormValueUpdated()
  {
  
    if(JSON.stringify(this.genInfoData)===this.tempArr)
    {
      return true;
    }
    else
    {
      return false;
    }
  }


  makeMailingAddressFormDisabled()
  {
    this.geneform.controls['MailingAddres'].disable();
    this.geneform.controls['MailingCountry'].disable();
    this.geneform.controls['MailingProvince'].disable();
    this.geneform.controls['MailingCity'].disable();
    this.geneform.controls['MailingPincode'].disable();
  }

  makeMailingAddressFormEnabled()
  {
    this.geneform.controls['MailingAddres'].enable();
    this.geneform.controls['MailingCountry'].enable();
    this.geneform.controls['MailingProvince'].enable();
    this.geneform.controls['MailingCity'].enable();
    this.geneform.controls['MailingPincode'].enable();
  }

  makeEmergencyAddressDisabled()
  {
    this.geneform.controls['EmergencyAddress'].disable();
    this.geneform.controls['EmergencyCountry'].disable();
    this.geneform.controls['EmergencyProvince'].disable();
    this.geneform.controls['EmergencyCity'].disable();
    this.geneform.controls['EmergencyPincode'].disable();
  }

  makeEmergencyAddressEnabled()
  {
    this.geneform.controls['EmergencyAddress'].enable();
    this.geneform.controls['EmergencyCountry'].enable();
    this.geneform.controls['EmergencyProvince'].enable();
    this.geneform.controls['EmergencyCity'].enable();
    this.geneform.controls['EmergencyPincode'].enable();
  }

}
