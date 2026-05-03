import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Country } from 'app/models/country-model';
import { Province } from 'app/models/province-model';
import { MiscService } from 'app/services/misc.service';
import { RequirementService } from 'app/services/requirement.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-program-filter',
  templateUrl: './program-filter.component.html',
  styleUrls: ['./program-filter.component.scss']
})
export class ProgramFilterComponent implements OnInit , OnDestroy{

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
  private onDestroy$: Subject<void> = new Subject<void>();
  @Input()
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

  @Output()
  formdataChange: EventEmitter<any> = new EventEmitter();


  @Input()
  Nationality: number;

  constructor(private miscService: MiscService,
    private requirementService: RequirementService,
  ) {

  }

  ngOnInit() {

    if (!this.formdata) {
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
        Nationality: this.Nationality | 0,
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

    this.fillCountry();
    this.fillEduLevel();
    this.fillGradeScheme();
    this.fillEnglishExam();
    this.fillDescipline();
    this.fillInstType();
    this.fillItek();
    this.fillSubDesciplines();
  }

  isDescSelected(id: number) {
    if (this.formdata && this.formdata.desciplines) {
      return this.formdata.Descipline.findIndex(c => c === id) >= 0;
    }
    else {
      return false;
    }
  }


  resetForm(from?: NgForm) {
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
      Nationality: this.Nationality | 0,
      ShortBy: 'SchoolRank',
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

  updateDescipline($event) {
    if (this.formdata) {
      if ($event.checked) {
        this.formdata.Descipline.push($event.source.value);
      }

      else {
        var index = this.formdata.Descipline.findIndex(i => i === $event.source.value);

        this.formdata.Descipline.splice(index, 1);
      }
      this.fillSubDesciplines();
    }
  }



  fillCountry() {
    this.miscService.country().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res;
      this.fillInstitutionList();
    });
  }

  fillProvince() {
    if (this.formdata) {
      this.miscService.provinceMultipleCountry(this.formdata.InstitutionCountries).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceList = res;
        this.fillInstitutionList();
      })
    }
  }

  fillInstitutionList() {

    if (this.formdata) {
      var data = {
        InstType: this.formdata.InstitutionType, Country: this.formdata.InstitutionCountries,
        Province: this.formdata.InstitutionProvinces
      }
      this.miscService.institutionForFilter(data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.institutionList = res;
      });
    }
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
    this.miscService.desciplines().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.desciplineList = res;
    });
  }

  fillInstType() {
    this.miscService.instituionType().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.instTypeList = res;
    });
  }

  fillItek() {
    this.miscService.inteksForFilter().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.intekList = res;
    });
  }

  fillSubDesciplines() {
    if (this.formdata) {
      this.miscService.subDesciplines(this.formdata.Descipline).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.subDesciplineList = res;
      });
    }
  }

  applyFilter() {
    if (this.Nationality) {
      this.formdata.Nationality = this.Nationality;
    }
    this.formdataChange.emit(this.formdata);
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
