import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Login } from 'app/models/login.model';
import { appPattern } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { Country } from 'app/models/country-model';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MiscService } from 'app/services/misc.service';
import { ApplicationService } from 'app/services/application.service';
import { StudentService } from 'app/services/student.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-education-background-dialog',
  templateUrl: './edit-education-background-dialog.component.html',
  styleUrls: ['./edit-education-background-dialog.component.scss']
})
export class EditEducationBackgroundDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  currentUser: Login;
  permission: number;
  eduInfoData: any;

  parentType: number;
  countryEduFilter: any = '';
  highEduFilter: any = '';
  gradingFilter:any='';
  modelPattern = appPattern;

  title: string = 'Education background';

  parentId: number;

  countryList: Country[];
  eduLevelList: any[];

  gradeList: any[];
  selectedGrade: any = null;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private miscService: MiscService,
    private applicatoinService: ApplicationService,
    private studentService: StudentService,
    authService: AuthenticationService,
    private toasterService: ToasterService,
    private matDialogRef: MatDialogRef<EditEducationBackgroundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.currentUser = authService.currentUserSubject.getValue();

    this.parentId = data.parentId;
    this.permission = data.permission;
    this.parentType = data.parentType;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.get();
    this.fillCountry();
    this.fillEduLevel();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onEduInfoFormSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }
    if (form.valid) {

      if (this.parentType === 7) {
        this.applicatoinService.updateEduInfo(this.eduInfoData)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop('success',this.title+' updated successfully');
            this.matDialogRef.close(true);
          });
      }
      else {
        this.studentService.updateEduInfo(this.eduInfoData)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop('success',this.title+' updated successfully');
            this.matDialogRef.close(true);
          });
      }
    }
  }

  fillGrade(reset?:any) {
    if(reset)
    {
      this.eduInfoData.GradingScheme=null;
      this.eduInfoData.GradeAverage=null;
    }
    if(this.eduInfoData.CountryOfEducation){
    this.miscService.gradeSchemeByCountry(this.eduInfoData.CountryOfEducation).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.gradeList = res;
      this.onGradeChange();
    });
  }
  else{
    this.gradeList = [];
    this.eduInfoData.GradingScheme = 0;
  }
  }

  onGradeChange(reset?:any) {
    if(reset)
    {
      this.eduInfoData.GradeAverage=null;
    }
    this.selectedGrade = null;
    if (this.eduInfoData.GradingScheme) {
      this.selectedGrade = this.gradeList.find(d => d.GrdSchemeId === this.eduInfoData.GradingScheme);
    }
  }

  get() {
    if (this.parentType === 7) {
      this.applicatoinService.getSectionWise(this.parentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.eduInfoData = res.eduInfo;
        this.fillGrade();
      });
    }
    else {
      this.studentService.getSectionWise(this.parentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.eduInfoData = res.eduInfo;
        this.fillGrade();
      });
    }
  }


  fillCountry() {
    this.countryList = [];
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
      });
  }

  fillEduLevel() {
    this.miscService.eduLevel().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.eduLevelList = res;
    });
  }

}
