import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Country } from 'app/models/country-model';
import { Province } from 'app/models/province-model';
import { Login } from 'app/models/login.model';
import { enumToArray, programModes, AppDefaultValue, defaultFilterData } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { MiscService } from 'app/services/misc.service';
import { RequirementService } from 'app/services/requirement.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'app/services/authentication.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-program-filter-display-dialog',
  templateUrl: './program-filter-display-dialog.component.html',
  styleUrls: ['./program-filter-display-dialog.component.scss']
})
export class ProgramFilterDisplayDialogComponent implements OnInit, OnDestroy {

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
  eduFilter: any = '';
  engFilter: any = '';
  schoolFilter: any = '';
  contryFilter: any = '';
  provinceFilter: any = '';
  schFilter: any = '';
  prgFilter: any = '';
  avilInFilter: any = '';
  modeFilter: any = '';
  formdata: any = defaultFilterData;
  value: number = 200000;
  currentUser: Login;
  programModeList = enumToArray(programModes);

  englishExamTypeR: any = AppDefaultValue.englishExamRange[0];

  private onDestroy$: Subject<void> = new Subject<void>();

  label: any;
  tooltip: any;
  tooltipEnabled: any;

  constructor(private miscService: MiscService,
    private requirementService: RequirementService,
    private matDialogRef: MatDialogRef<ProgramFilterDisplayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    authService: AuthenticationService) {

    this.currentUser = authService.currentUserSubject.getValue();


    if (data.formdata) {
      this.formdata = data.formdata;
    } else {
      this.formdata = defaultFilterData;
    }

    this.label = {
            visible: true,
            format: (value) => {
                return this.format(value);
            },
            position: "top"
        };
        this.tooltip = {
            enabled: true,
            format: (value) => {
                return this.format(value);
            },
            showMode: "always", 
            position: "bottom"
        };
        this.tooltipEnabled = {
            enabled: true
        };

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

    this.label = {
      visible: true,
      format: (value) => {
        return this.format(value);
      },
      position: "top"
    };
    this.tooltip = {
      enabled: true,
      format: (value) => {
        return this.format(value);
      },
      showMode: "always",
      position: "bottom"
    };
    this.tooltipEnabled = {
      enabled: true
    };
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }




  fillCountry() {
    this.miscService.countryInstOriginOnly()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
        this.fillProvince();
        this.fillInstitutionList();

      });
  }

  fillProvince() {
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

  onEnglishExamChange(reset?: boolean) {
    try {
      if (reset) {
        this.formdata.EnglishExamL = '';
        this.formdata.EnglishExamR = '';
        this.formdata.EnglishExamW = '';
        this.formdata.EnglishExamS = '';
        this.formdata.EnglishExamOverall = '';
      }

      if (this.formdata.EnglishExamType) {
        this.englishExamTypeR = AppDefaultValue.englishExamRange.find(d => d.Type === this.formdata.EnglishExamType);
      }
      else {
        this.englishExamTypeR = AppDefaultValue.englishExamRange[0];
      }

    }
    catch (e) {
      this.englishExamTypeR = AppDefaultValue.englishExamRange[0];
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.matDialogRef.close(this.formdata);
  }



  format(value) {
    return value;
  }

}
