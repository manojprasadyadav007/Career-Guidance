import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Country } from 'app/models/country-model';
import { MiscService } from 'app/services/misc.service';
import { RequirementService } from 'app/services/requirement.service';
 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Province } from 'app/models/province-model';
 
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { enumToArray, programModes, AppDefaultValue } from 'app/models/site-map.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-program-filter-dialog',
  templateUrl: './program-filter-dialog.component.html',
  styleUrls: ['./program-filter-dialog.component.scss']
})
export class ProgramFilterDialogComponent implements OnInit , OnDestroy {

  countryList: Country[];
  provinceList: Province[];
  eduLevelList: any[];
  gradeSchemeList: any[];
  reqList: any[];
  desciplineList: string[];
  subDesciplineList: any[];
  intekList: any[];
  instTypeList: any[];
  institutionList: any[];
  englistFilter:any='';
  formdata: any = {
    CountryOfEducation: 0,
    EduLevel: 0,
    GradeScheme: 0,
    GradeAverage: '',
    OnlyDirectAddmission: false,
    EnglishExamType: 0,
    EnglishExamL: '',
    EnglishExamR: '',
    EnglishExamS: '',
    EnglishExamW: '',
    Descipline: [],
    Nationality: 0,
    SortBy: 'SchoolRank',
    ShowCommission: false,
    InstitutionType: [],
    InstitutionCountries: [],
    InstitutionProvinces: [],
    Institutions: [],
    ProgramLevel: 0,
    Inteks: [],
    SubDesciplines: [],
    Keyword: '',
    MinTutionFee: 0,
    MaxTutionFee: 200000,
    MinApplicationFee: 0,
    MaxApplicationFee: 100000,
    onCampus: false,
    offCampus: false,
    homeStay: false,
    postGraduateWithWork: false,
    programWithCoOpOption: false,
    conditionalOfferLetter: false,
    workWhileStudy: false,
    ProgramId: '',
    EnglishExamOverall: '',
    ProgramModes: [],
  };

  currentUser: Login;
  programModeList = enumToArray(programModes);

  englishExamTypeR: any = AppDefaultValue.englishExamRange[0];

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private miscService: MiscService,
    private requirementService: RequirementService,
    private matDialogRef:MatDialogRef<ProgramFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    authService: AuthenticationService) {

    this.currentUser = authService.currentUserSubject.getValue();


    if (data.formdata) {
      this.formdata = data.formdata;
    } else {
      this.formdata = {
        CountryOfEducation: 0,
        EduLevel: 0,
        GradeScheme: 0,
        GradeAverage: '',
        OnlyDirectAddmission: false,
        EnglishExamType: 0,
        EnglishExamL: '',
        EnglishExamR: '',
        EnglishExamS: '',
        EnglishExamW: '',
        Descipline: [],
        Nationality: 0,
        SortBy: 'SchoolRank',
        ShowCommission: false,
        InstitutionType: [],
        InstitutionCountries: [],
        InstitutionProvinces: [],
        Institutions: [],
        ProgramLevel: 0,
        Inteks: [],
        SubDesciplines: [],
        Keyword: '',
        MinTutionFee: 0,
        MaxTutionFee: 200000,
        MinApplicationFee: 0,
        MaxApplicationFee: 100000,
        onCampus: false,
        offCampus: false,
        homeStay: false,
        postGraduateWithWork: false,
        programWithCoOpOption: false,
        conditionalOfferLetter: false,
        workWhileStudy: false,
        ProgramId: '',
        EnglishExamOverall: '',
        ProgramModes: [],
      }
    }
  }

  ngOnInit() {
    this.fillCountry();
    this.fillEduLevel();
    this.fillGradeScheme();
    this.fillEnglishExam();
    this.fillDescipline();
    this.fillInstType();
    this.fillItek();
    this.onEnglishExamChange();
    //this.fillSubDesciplines();
  }
 
  ngOnDestroy(): void {
    this.onDestroy$.next();
   this.onDestroy$.complete();
   }
   
 


  fillCountry() {
    this.miscService.countryInstOriginOnly()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res;
      this.fillInstitutionList();
    });
  }

  fillProvince(reset?:boolean) {
    if(reset){this.formdata.InstitutionProvinces=null}
    this.miscService.provinceInstOriginOnly(this.formdata.InstitutionCountries)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.provinceList = res;
      this.fillInstitutionList();
    })
  }

  fillInstitutionList() {
    var data = {
      InstType: this.formdata.InstitutionType, Country: this.formdata.InstitutionCountries,
      Province: this.formdata.InstitutionProvinces
    }
    this.miscService.institutionForFilter(data)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.institutionList = res;
    })
  }

  fillEduLevel() {
    this.miscService.eduLevel()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.eduLevelList = res;
    });
  }

  fillGradeScheme() {
    this.miscService.gradeScheme()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.gradeSchemeList = res;
    });
  }

  fillEnglishExam() {
    this.requirementService.ListRequirement(1)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.reqList = res;
    });
  }
  fillDescipline() {
    this.miscService.disciplinesGroup()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.desciplineList = res;
    });
  }

  fillInstType() {
    this.miscService.instituionType()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.instTypeList = res;
    });
  }

  fillItek() {
    this.miscService.inteksForFilter()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.intekList = res;
    });
  }

  onEnglishExamChange(reset?:boolean)
  {
    try {
      if (reset) {
        this.formdata.EnglishExamL = '';
        this.formdata.EnglishExamR = '';
        this.formdata.EnglishExamW = '';
        this.formdata.EnglishExamS = '';
        this.formdata.EnglishExamOverall = '';
      }

      if(this.formdata.EnglishExamType)
      {
        this.englishExamTypeR = AppDefaultValue.englishExamRange.filter(d => d.Type === this.formdata.EnglishExamType)[0];
      }
      else
      {
        this.englishExamTypeR = AppDefaultValue.englishExamRange[0];
      }
    
    }
    catch (e) {

    }
  }

  onSubmit(form:NgForm)
  {
    if(form.invalid)
    {
      return;
    }
    this.matDialogRef.close(this.formdata);
  }


}
