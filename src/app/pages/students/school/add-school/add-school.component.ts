import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Country } from 'app/models/country-model';
import { StudentSchool } from 'app/models/student-school.model';
import { MiscService } from 'app/services/misc.service';
import { isUndefined } from 'util';
import { StudentSchoolService } from 'app/services/student-school.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { MatDialog } from '@angular/material/dialog';
import { appPattern } from '../../../../models/site-map.model';
import { ToasterService } from 'angular2-toaster/src/toaster.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit, OnDestroy {

  countryList: Country[];
  eduLevelList: any[];
  subjectList: any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  formdata: StudentSchool;
  scoredata: any = { SubjectId: '', SubjectName: '', MaxMarks: '', MinMarks: '', ObtainMarks: '', GradeId: 0, GradeName: '' };
  flagdisabled: boolean = false;
  btnLable: string = "Add";
  eduFilter: any = '';
  instFilter: any = '';
  priminFilter: any = '';
  streamFilter: any = '';
  subFilter: any = '';
  gradFilter: any = '';
  id: number;
  maxDate: any = new Date();
  parentId: number;
  parentType: number;

  gradeList: any[];
  countryGradeList: any[];
  otherGradeList: any[];
  selectedGrade: any = null;

  languageList: any[];

  provinceList: any;
  provinceFilter: any = '';

  modelPattern = appPattern;
  streamList: any[];

  constructor(private dialogRef: MatDialogRef<AddSchoolComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private miscService: MiscService, private matDialog: MatDialog,
    private schoolService: StudentSchoolService,
    private toasterService: ToasterService) {
    if (data) {
      if (data.SchoolId) {
        this.id = data.SchoolId;
      }

      this.parentId = data.ParentId;
      this.parentType = data.ParentType;
    }
  }

  ngOnInit() {
    this.fillCountry();
    this.fillEduLevel();
    this.fillSubjectList();
    this.miscService.language().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.languageList = res;
    });
    this.miscService.stream().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.streamList = res;
    });
    this.resetScore();
    this.resetForm(null);


  }

  resetForm(form?: NgForm) {

    this.formdata = {
      SchoolId: 0,
      ParentId: this.parentId,
      ParentType: this.parentType,
      LevelOfEducation: null,
      LevelOfEducationName: '',
      CountryOfInstitution: null,
      CountryOfInstitutionName: '',
      NameOfInstitution: '',
      Language: '',
      AttendendFrom: null,
      AttendendTo: null,
      Degree: '',
      DegreeAwardedOn: null,
      Addres: '',
      City: '',
      Province: '',
      Pincode: '',
      Marks: [],
      StreamId: 0
    }
    if (form) {
      form.resetForm();
    }
    this.resetScore();

    if (this.id > 0) {
      this.schoolService.get(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
       let provinceId=Number(res.Province)
             this.formdata.Province=provinceId;      
        this.fillGrade();
        this.btnLable = "Update";
      });
    }
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (!this.formdata.Marks || this.formdata.Marks.length <= 0) {
      return;
    }
    this.flagdisabled = true;
    if (this.id > 0) {
      this.schoolService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'School updated successfully');
        this.dialogRef.close(true);
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {
      this.schoolService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'School saved successfully');
        this.dialogRef.close(true);
      }, err => {
        this.flagdisabled = false;
      });
    }

  }

  fillCountry() {
    this.miscService.country().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res;
    });
  }

  fillEduLevel() {
    this.schoolService.eduLevel(this.parentType, this.parentId, this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.eduLevelList = res;
    });
  }

  getCountryName() {
    if (!isUndefined(this.countryList) && this.countryList.length > 0) {
      this.formdata.CountryOfInstitutionName =
        this.countryList.find(c => c.CountryId === this.formdata.CountryOfInstitution).CountryName;
    }
  }

  getEduName() {
    if (!isUndefined(this.eduLevelList) && this.eduLevelList.length > 0) {
      this.formdata.LevelOfEducationName =
        this.eduLevelList.find(c => c.EduLevelId === this.formdata.LevelOfEducation).EduLevelName;
    }
  }



  fillSubjectList() {
    this.miscService.subject().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.subjectList = res;
    });
  }

  resetScore(form?: NgForm) {
    this.selectedGrade = null;
    if (form) {
      form.resetForm({
        SubjectId: '',
        SubjectName: '',
        MaxMarks: '',
        MinMarks: '',
        ObtainMarks: '',
        GradeId: 0,
        GradeName: ''
      });
    }
    else {
      this.scoredata = {
        SubjectId: '',
        SubjectName: '',
        MaxMarks: '',
        MinMarks: '',
        ObtainMarks: '',
        GradeId: 0,
        GradeName: ''
      }
    }

    //this.scoredata.GradeId=0;

  }

  addMarks(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.scoredata.SubjectName = this.subjectList.filter(d => d.SbjId === this.scoredata.SubjectId)[0].SbjName;

    if (this.selectedGrade) {
      this.scoredata.GradeName = this.selectedGrade.GrdSchemeName;
    }
    else {
      this.scoredata.GradeName = '';
    }

    this.deleteMarks(this.scoredata, 0);
    this.formdata.Marks.push(Object.assign({}, this.scoredata));
    this.resetScore(form);
  }

  deleteMarks(data: any, status: number) {
    var index = this.formdata.Marks.findIndex(d => d.SubjectId === data.SubjectId)
    if (status === 0) {
      if (index >= 0) {
        this.formdata.Marks.splice(index, 1);
      }

    } else {
      this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          if (index >= 0) {
            this.formdata.Marks.splice(index, 1);
          }
        }
      });
    }


  }

  fillGrade() {
    this.gradeList = [];
    this.countryGradeList = [];
    this.otherGradeList = [];
    this.selectedGrade = null;
    this.scoredata = { SubjectId: '', SubjectName: '', MaxMarks: '', MinMarks: '', ObtainMarks: '', GradeId: 0, GradeName: '' };

    this.miscService.gradeSchemeByCountry(this.formdata.CountryOfInstitution).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.gradeList = res;
      this.countryGradeList = this.gradeList.filter(d => d.CountryId === this.formdata.CountryOfInstitution);
      this.otherGradeList = this.gradeList.filter(d => !d.CountryId || d.CountryId === 0);
    });

    if(this.formdata.CountryOfInstitution) { this.fillProvince(this.formdata.CountryOfInstitution); }
  }

  fillProvince(countryId) {
    this.provinceList = [];
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceList = res;
      });
  }

  onGradeChange() {
    this.scoredata.MaxMarks = '';
    this.scoredata.MinMarks = '';
    this.selectedGrade = null;

    if (this.scoredata.GradeId > 0) {
      this.selectedGrade = this.gradeList.find(d => d.GrdSchemeId === this.scoredata.GradeId);
    }

  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
