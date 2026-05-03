import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment';
import { Country } from 'app/models/country-model';
import { Province } from 'app/models/province-model';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'app/services/report.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { MiscService } from 'app/services/misc.service';
import { RequirementService } from 'app/services/requirement.service';
import { InstituteService } from 'app/services/institute.service';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { Login } from 'app/models/login.model';
import { MatDialog } from '@angular/material';
import { SelectNationalityDialogComponent } from '../select-nationality-dialog/select-nationality-dialog.component';
import { enumToArray, programModes } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-search-program-public',
  templateUrl: './search-program-public.component.html',
  styleUrls: ['./search-program-public.component.scss']
})
export class SearchProgramPublicComponent implements OnInit , OnDestroy {

  searchData: any = { Nationality: null, param1: '', param2: '' }
  programList: any[];

  parentRoute: string = "";
  currentUser: Login;
  filepath: string = environment.filepath + 'institution/';
  nationFilter:any='';
  nationalityList: any[];
  instList:any[];
  filteredInstListObs:any[];
  filteredDisciplineListObs:any[];
  disciplineList:any[];

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



  // filter var

  countryList: Country[];
  provinceList: Province[];
  eduLevelList: any[];
  gradeSchemeList: any[];
  reqList: any[];
  desciplineList: any[];
  subDesciplineList: any[];
  intekList: any[];
  instTypeList: any[];
  institutionList: any[];

  programModeList = enumToArray(programModes);

  //end filter var

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
    private reportService: ReportService,
    private authService: AuthenticationService,
    private miscService: MiscService,
    private requirementService: RequirementService,
    private instService: InstituteService,
    private programIntakeService: ProgramIntekService
    , private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();

    if (this.currentUser.UserId > 0) {
      this.parentRoute = "member/";
    }

    this.route.queryParamMap
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.searchData = { Nationality: null, param1: res.get('param1'), param2: res.get('param2') };
    });

    this.miscService.countryListForSearchProgram()
    .pipe(takeUntil(this.onDestroy$)).subscribe(
      res => {
        this.nationalityList = res;
      }
    );
 
    this.fillCountry();
    this.fillEduLevel();
    this.fillGradeScheme();
    this.fillEnglishExam();
    this.fillDescipline();
    this.fillInstType();
    this.fillItek();

    this.miscService.instPageListParam1().subscribe(res=>{
      this.disciplineList=res;
    });

    this.miscService.instPageListParam2().subscribe(res=>{
      this.instList = res;
    });

    if (localStorage.getItem('nationality')) {
      this.searchData.Nationality = +localStorage.getItem('nationality');
      this.onNationalityChange();
    }
    else {
      this.showSelectNationality();
    }

  }

  filterParam1(value: string) {
    if (value) {
      this.filteredDisciplineListObs= this.disciplineList
        .map(group => ({label: group.label, data: this._filterParam1(group.data, value)}))
        .filter(group => group.data.length > 0);
        return;
    }
    this.filteredDisciplineListObs= [];
  }

  _filterParam1 = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();
  
    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  };
  

  filterParam2(value: string){
    
    if (value) {
     this.filteredInstListObs = this.instList
        .map(group => ({label: group.label, data: this._filterParam2(group.data, value,group.label)}))
        .filter(group => group.data.length > 0);
        return;
    }
    this.filteredInstListObs = [] ;
  }
  _filterParam2 = (opt: any[], value: string,label:string): string[] => {
    if(label.toLowerCase()==='country')
    {
      return opt.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));
    }
    else{
      return opt.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 
        || (item.code!='' && item.code.toLowerCase().startsWith(value.toLowerCase())) );
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  onSubmit() {
    this.formdata.ProgramId = '';
    if (this.formdata.Nationality != this.searchData.Nationality) {
      this.formdata.Nationality = this.searchData.Nationality;
      this.fillInstitutionList();
      this.fillItek();
    }

    this.reportService.searchProgram(this.searchData)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.programList = res;
      this.updateProgramIds();
    });
  }

  updateProgramIds() {
    this.formdata.ProgramId = '';
    if (this.programList && this.programList.length > 0) {
      this.formdata.ProgramId = this.programList.map(res => {
        return res.programs.map(res1 => {
          return res1.ProgramId
        })
      }).reduce(function (a, b) { return a.concat(b); }).join(",");
    }

  }

  doFilterProgram() {
    if (this.formdata) {
      this.reportService.programByFilter(this.formdata)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.programList = res;
      });
    }
  }

  fillCountry() {
    this.miscService.countryInstOriginOnly()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res;
      this.fillInstitutionList();
    });
  }

  fillProvince(reset?:boolean) {
    if(reset){this.formdata.InstitutionProvinces=null;}
    if (this.formdata) {
      this.miscService.provinceInstOriginOnly(this.formdata.InstitutionCountries)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceList = res;
        this.fillInstitutionList();
      })
    }
  }

  fillInstitutionList() {

    if (this.formdata) {
      var data = {
        InstType: this.formdata.InstitutionType, Country: this.formdata.InstitutionCountries,
        Province: this.formdata.InstitutionProvinces,
        Nationality: this.formdata.Nationality
      }
      this.instService.forProgramSearch(data)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.institutionList = res;
      });
    }
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
    this.intekList = [];
    if (this.formdata.Nationality && this.formdata.Nationality > 0) {
      this.programIntakeService.forProgramSearch(this.formdata.Nationality)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.intekList = res;
      });
    }

  }


  applyFilter() {
    this.formdata.Nationality = this.searchData.Nationality;
    this.doFilterProgram();
  }

  onNationalityChange() {
    localStorage.setItem('nationality', this.searchData.Nationality);
    this.onSubmit();
  }

  showSelectNationality() {
    this.matDialog.open(SelectNationalityDialogComponent, { width: '50%', minWidth: '400px', disableClose: true }).afterClosed()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.searchData.Nationality = res;
      this.onNationalityChange();
    });
  }

}
