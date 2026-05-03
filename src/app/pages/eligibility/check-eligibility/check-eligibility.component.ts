import { Component, OnInit, OnDestroy } from '@angular/core';
import { Country } from 'app/models/country-model';
import { MiscService } from 'app/services/misc.service';
import { RequirementService } from 'app/services/requirement.service';
import { NgForm, FormGroup } from '@angular/forms';
import { EligibilityService } from 'app/services/eligibility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { MatDialog, MatStepper } from '@angular/material';
import { SearchStudentComponent } from '../../search-student/search-student.component';
import { StudentLoginDialogComponent } from 'app/pages/student-login-dialog/student-login-dialog.component';
import { Login } from 'app/models/login.model';
import { StudentService } from 'app/services/student.service';
import { AppDefaultValue, appPattern, defaultFilterData } from 'app/models/site-map.model';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-check-eligibility',
  templateUrl: './check-eligibility.component.html',
  styleUrls: ['./check-eligibility.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class CheckEligibilityComponent implements OnInit, OnDestroy {


  result: boolean;

  countryList: Country[];
  eduLevelList: any[];

  gradeSchemeList: any[];
  reqList: any[];
  desciplineList: any[];
  eligiblityData: any;
  programList: any[];
  programId: number;
  currentUser: Login;
  nationFilter: any = '';
  eduFilter: any = '';
  heduFilter: any = '';
  gradFilter: any = '';
  engFilter: any = '';
  ceduFilter: any = '';
  GradeFilter: any = '';
  subjFilter: any = '';
  grabingFilter: any = '';
  nationalityFilter: any = '';
  countryEduFilter: any = '';
  highestEduFilter: any = '';
  GradingFilter: any = '';
  englishEFilter: any = '';
  countryEdFilter: any = '';
  gradeFilter: any = '';
  subjectFilter: any = '';
  grabingsFilter: any = '';
  firstFormGroup: FormGroup;

  thirdFormGroup: FormGroup;

  institutionId: number = 0;

  filterData: any = defaultFilterData;

  subjectList: any[];

  acadmicGradeSchemeList: any[];

  testResult: boolean = false;

  parentRoute: string = "";

  stepindex: number = 0;

  modelPattern = appPattern;

  englishExamTypeR: any = AppDefaultValue.englishExamRange[0];

  highestGradeSchemeData: any;
  academicGradeSchemeData: any;

  programIds: string = '';

  private onDestroy$: Subject<void> = new Subject<void>();

  assignedInstList: any[] = null;

  constructor(private miscService: MiscService,
    private requirementService: RequirementService,
    private eligibityService: EligibilityService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private matDialog: MatDialog,
    private studentService: StudentService,
  ) {
    this.currentUser = this.authService.currentUserSubject.value;
    if (this.authService.currentUserSubject.getValue().UserId > 0) {
      this.parentRoute = 'member/';
    }
  }

  ngOnInit() {

    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.programId = +res.get("programid") | 0;
      this.institutionId = +res.get("institutionid") | 0;
      this.stepindex = this.programId > 0 ? -1 : 0;
    });
    this.resetForm(null);
    this.getAssignedInst();
    this.fillCountry();
    this.fillEduLevel();

    this.fillEnglishExam();

    this.miscService.subject().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.subjectList = res;
    });

    this.fillDescipline();
    if (sessionStorage.getItem(AppDefaultValue.eligiblityKey)) {
      this.eligiblityData = JSON.parse(sessionStorage.getItem(AppDefaultValue.eligiblityKey));
    }
    else {
      if (this.currentUser.UserId > 0 && this.currentUser.RoleId == 3) {
        this.eligiblityData.StudentId = this.currentUser.RefId;
        this.fillStudentData();
        return;
      }
    }

    this.onHighestEducationCountryChange();
    this.onHighestGradeSchemeChange();
    this.onEnglishExamChange();
    this.onAcadmicCountryChange();
    this.onAcademicGradeSchemeChange();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  resetForm(from?: NgForm) {
    this.eligiblityData = {
      StudentId: 0,
      Name: '',
      Nationality: localStorage.getItem('nationality') ? +localStorage.getItem('nationality') : null,
      CountryOfEducation: null,
      EduLevel: null,
      GradeScheme: null,
      GradeAverage: '',
      EnglishExamType: null,
      EnglishExamL: '',
      EnglishExamR: '',
      EnglishExamS: '',
      EnglishExamW: '',
      EnglishExamOverall: '',
      Descipline: [],
      AcadmicCountry: null,
      AcadmicSubject: null,
      AcadmicGrade: null,
      AcadmicGradeScheme: null,
      AcadmicScore: '',
      ProgramId: this.programId | 0

    }
  }


  fillCountry() {
    this.miscService.country().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res;
    });
  }

  fillEduLevel() {
    this.miscService.eduLevel().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.eduLevelList = res;
    });
  }

  fillGradeScheme() {
    this.miscService.gradeScheme().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.gradeSchemeList = res;
    });
  }

  fillEnglishExam() {
    this.requirementService.ListRequirement(1).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.reqList = res;
    });
  }


  fillDescipline() {
    this.miscService.disciplinesGroup().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.desciplineList = res;
    });
  }




  showStudentSelect() {
    if (this.currentUser.UserId > 0 && this.currentUser.RoleId != 3) {
      this.matDialog.open(SearchStudentComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.eligiblityData.StudentId = res;
          if (this.eligiblityData.StudentId > 0) {
            this.fillStudentData();
          }
          else {
            sessionStorage.removeItem(AppDefaultValue.eligiblityKey);
            this.resetForm(null);
          }
        }
      });
    }
  }

  fillStudentData() {
    this.studentService.get(this.eligiblityData.StudentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.eligiblityData.Name = res.FirstName + ' ' + res.MiddleName + ' ' + res.LastName;


      this.eligiblityData.Nationality = res.Citizenship;

      this.eligiblityData.CountryOfEducation = res.CountryOfEducation;
      this.eligiblityData.EduLevel = res.HighestLevelOfEducation;
      this.eligiblityData.GradeScheme = res.GradingScheme;
      this.eligiblityData.GradeAverage = res.GradeAverage;

      this.eligiblityData.EnglishExamType = res.EnglishExamType;
      this.eligiblityData.EnglishExamL = res.EnglishScoreL;
      this.eligiblityData.EnglishExamR = res.EnglishScoreR;
      this.eligiblityData.EnglishExamS = res.EnglishScoreW;
      this.eligiblityData.EnglishExamW = res.EnglishScoreS;
      this.eligiblityData.EnglishExamOverall = res.EnglishScoreOverall;

      this.onHighestEducationCountryChange();
      this.onHighestGradeSchemeChange();
      this.onEnglishExamChange();
      this.onAcadmicCountryChange();
      this.onAcademicGradeSchemeChange();

      if (this.stepindex >= 0) {
        this.stepindex = 0;
      }

      this.updateFilterData();

      sessionStorage.setItem(AppDefaultValue.eligiblityKey, JSON.stringify(this.eligiblityData));
    });
  }



  applyProgram(data: any) {

    if (this.eligiblityData.StudentId > 0) {
      this.router.navigate(['member/application/apply', 0, this.eligiblityData.StudentId, data.ProgramId, data.InstitutionId]);
    }
    else {
      if (this.currentUser.UserId > 0) {
        this.router.navigate(['member/application/apply', 0, 0, data.ProgramId, data.InstitutionId]);
      }
      else {
        this.matDialog.open(StudentLoginDialogComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.router.navigate([(+res === 0 ? 'signup/student' : 'member/application/apply'), 0, +res, , data.ProgramId, data.InstitutionId]);
          }
        });
      }
    }
  }

  testEligibility(form?: NgForm) {
    if (form && form.invalid) {
      return;
    }
    this.eligibityService.testEligibility(this.eligiblityData).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res === 'OK') {
        this.applyProgram({ ProgramId: this.programId, InstitutionId: this.institutionId });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res,
        });
        this.stepindex = 1;
        this.updateFilterData();
      }
    });
  }

  showEligibleProgram(stepper?: MatStepper) {
    this.eligibityService.eligibleProgram(this.eligiblityData).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.programList = res;
      this.updateFilterData();
      this.updateProgramIds();
      if (stepper) {
        stepper.next();
      }
    });
  }


  onHighestEducationCountryChange(reset?: boolean) {
    if (reset) {
      this.eligiblityData.GradeScheme = 0;
      this.eligiblityData.GradeAverage = '';
    }
    this.gradeSchemeList = [];
    if (this.eligiblityData.CountryOfEducation > 0) {
      this.miscService.gradeSchemeByCountry(this.eligiblityData.CountryOfEducation).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.gradeSchemeList = res;
      });
    }
  }

  onAcadmicCountryChange(reset?: boolean) {
    if (reset) {
      this.eligiblityData.AcadmicGradeScheme = null;
      this.eligiblityData.AcadmicScore = '';
    }
    this.acadmicGradeSchemeList = [];
    if (this.eligiblityData.AcadmicCountry > 0) {
      this.miscService.gradeSchemeByCountry(this.eligiblityData.AcadmicCountry).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.acadmicGradeSchemeList = res;
      });
    }
  }

  onEnglishExamChange(reset?: boolean) {
    try {
      if (reset) {
        this.eligiblityData.EnglishExamL = '';
        this.eligiblityData.EnglishExamR = '';
        this.eligiblityData.EnglishExamW = '';
        this.eligiblityData.EnglishExamS = '';
        this.eligiblityData.EnglishExamOverall = '';
      }

      if (this.eligiblityData.EnglishExamType) {
        this.englishExamTypeR = AppDefaultValue.englishExamRange.find(d => d.Type === this.eligiblityData.EnglishExamType);
      }
      else {
        this.englishExamTypeR = AppDefaultValue.englishExamRange[0];
      }

    }
    catch (e) {
      this.englishExamTypeR = AppDefaultValue.englishExamRange[0];
    }
  }

  onHighestGradeSchemeChange(reset?: boolean) {
    this.highestGradeSchemeData = this.gradeSchemeList.find(d => d.GrdSchemeId === this.eligiblityData.GradeScheme);
  }

  onAcademicGradeSchemeChange(reset?: boolean) {
    this.academicGradeSchemeData = null;

    if (this.eligiblityData.AcadmicGradeScheme) {
      this.academicGradeSchemeData = this.gradeSchemeList.find(d => d.GrdSchemeId === this.eligiblityData.AcadmicGradeScheme);
    }
  }

  updateProgramIds() {
    this.programIds = '';

    if (this.programList && this.programList.length > 0) {
      let prg = [];
      this.programList.forEach(value => {
        value.programs.forEach(element => {
          prg.push(element.ProgramId);
        });
      });

      this.programIds = prg.toString().replace(/ /g, "");
    }
  }

  updateFilterData() {
    if (!this.filterData) {
      this.filterData = defaultFilterData;
    }

    this.filterData.CountryOfEducation = this.eligiblityData.CountryOfEducation;
    this.filterData.EduLevel = this.eligiblityData.EduLevel;
    this.filterData.GradeScheme = this.eligiblityData.GradeScheme;
    this.filterData.GradeAverage = this.eligiblityData.GradeAverage;
    this.filterData.EnglishExamType = this.eligiblityData.EnglishExamType;
    this.filterData.EnglishExamL = this.eligiblityData.EnglishExamL;
    this.filterData.EnglishExamR = this.eligiblityData.EnglishExamR;
    this.filterData.EnglishExamS = this.eligiblityData.EnglishExamS;
    this.filterData.EnglishExamW = this.eligiblityData.EnglishExamW;
    this.filterData.Descipline = this.eligiblityData.Descipline;
    this.filterData.Nationality = this.eligiblityData.Nationality;
    this.filterData.EnglishExamOverall = this.eligiblityData.EnglishExamOverall;
  }


  getAssignedInst() {
    if (this.currentUser.RoleId === 2) {
      this.authService.assignedInstitutionIds().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.assignedInstList = res;
      });
    }
  }

}
