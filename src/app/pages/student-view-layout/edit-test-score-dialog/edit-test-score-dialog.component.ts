import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Login } from 'app/models/login.model';
import { appPattern, AppDefaultValue } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { ApplicationService } from 'app/services/application.service';
import { StudentService } from 'app/services/student.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { RequirementService } from 'app/services/requirement.service';

@Component({
  selector: 'app-edit-test-score-dialog',
  templateUrl: './edit-test-score-dialog.component.html',
  styleUrls: ['./edit-test-score-dialog.component.scss']
})
export class EditTestScoreDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  currentUser: Login;
  permission: number;
  testScoreData: any;
  engFilter: any = '';
  parentType: number;
  tempArr:any;
  modelPattern = appPattern;

  title: string = 'Test score';

  parentId: number;

  reqList: any[];

  englishExamTypeR: any = AppDefaultValue.englishExamRange[0];

  today: Date = new Date();
  gradingFilter:any='';
  private onDestroy$: Subject<void> = new Subject<void>();

  needEnglishExamDoc = false;
  haveEnglishExamDoc = false;
  needOtherExamDoc = false;
  haveOtherExamDoc = false;

  constructor(
    private requirementService: RequirementService,
    private applicatoinService: ApplicationService,
    private studentService: StudentService,
    authService: AuthenticationService,
    private toasterService: ToasterService,
    private matDialogRef: MatDialogRef<EditTestScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.currentUser = authService.currentUserSubject.getValue();

    this.parentId = data.parentId;
    this.permission = data.permission;
    this.parentType = data.parentType;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.fillEnglishExam();    
    this.get();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onTestScoreFormSubmit(form: NgForm) {
    if (form.valid && (!this.needEnglishExamDoc || (this.needEnglishExamDoc && this.haveEnglishExamDoc)) && (!this.needOtherExamDoc || (this.needOtherExamDoc && this.haveOtherExamDoc))) {
      if (this.parentType === 7) {
        this.applicatoinService.updateTestScore(this.testScoreData)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop('success',this.title+' updated successfully');
            this.matDialogRef.close(true);
          });
      }
      else {
        this.studentService.updateTestScore(this.testScoreData)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop('success',this.title+' updated successfully');
            this.matDialogRef.close(true);
          });
      }
    }
  }

  uploadFinishEnglishExam(e: any){
    if(e !== null) {
      this.testScoreData.EnglishExamDocPath = e;
      this.haveEnglishExamDoc = true;
    } else {
      this.testScoreData.EnglishExamDocPath = '';
      this.haveEnglishExamDoc = false;
    }
  }

  uploadFinishOtherExam(e: any) {
    if(e !== null) {
      this.testScoreData.OtherExamDocPath = e;
      this.haveOtherExamDoc = true;
    } else {
      this.testScoreData.OtherExamDocPath = '';
      this.haveOtherExamDoc = false;
    }
  }

  get() {

    if (this.parentType === 7) {
      this.applicatoinService.getSectionWise(this.parentId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.testScoreData = res.testScore;
          this.tempArr=JSON.stringify(res.testScore);
        //  this.testScoreData.EnglishExamType = null;
          this.onExamTypeChange();
        });
    }
    else {
      this.studentService.getSectionWise(this.parentId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.testScoreData = res.testScore;
          this.tempArr=JSON.stringify(res.testScore);
         //    this.testScoreData.EnglishExamType = null;
          this.onExamTypeChange();
        });
    }
  }

  isFormValueUpdated()
  {
    if(JSON.stringify(this.testScoreData)===this.tempArr)
    {
      return true;
    } else {
      return false; 
    }
  }


  fillEnglishExam() {
    this.requirementService.ListRequirement(1)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.reqList = res;
        this.onExamTypeChange();
      });
  }

  dateChangedEnglishExam() {
    if(this.getTime(this.testScoreData.EnglishExamDate)> this.today.getTime()) {
      this.testScoreData.EnglishScoreL = '';
      this.testScoreData.EnglishScoreR = '';
      this.testScoreData.EnglishScoreW = '';
      this.testScoreData.EnglishScoreS = '';
      this.testScoreData.EnglishScoreOverall = '';
      this.testScoreData.EnglishExamUser = '';
      this.testScoreData.EnglishExamPswd = '';
      this.testScoreData.EnglishExamRemark = '';


      this.needEnglishExamDoc = true;
      this.haveEnglishExamDoc = this.testScoreData.EnglishExamDocPath === null || this.testScoreData.EnglishExamDocPath === '' ? false : true;
    } else {
      this.needEnglishExamDoc = false;
      this.haveEnglishExamDoc = this.testScoreData.EnglishExamDocPath === null || this.testScoreData.EnglishExamDocPath === '' ? false : true;
    }
  }

  dateChangedOtherExam() {
    if(this.getTime(this.testScoreData.GMATExamDate)> this.today.getTime()) {
      this.testScoreData.ACTScoreEnglish = '';
      this.testScoreData.ACTScoreMath = '';
      this.testScoreData.ACTScoreReading = '';
      this.testScoreData.ACTScoreScience = '';
      this.testScoreData.ACTScoreWriting = '';
      this.testScoreData.ACTScoreTotal = '';

      this.testScoreData.GMATScoreV = '';
      this.testScoreData.GMATScoreQ = '';
      this.testScoreData.GMATScoreA = '';
      this.testScoreData.GMATScoreI = '';

      this.testScoreData.GREScoreV = '';
      this.testScoreData.GREScoreQ = '';
      this.testScoreData.GREScoreW = '';

      this.testScoreData.SATScoreMath = '';
      this.testScoreData.SATScoreEBRW = '';
      this.testScoreData.SATScoreTotal = '';

      this.needOtherExamDoc = true;
      this.haveOtherExamDoc = this.testScoreData.OtherExamDocPath === null ||  this.testScoreData.OtherExamDocPath === '' ? false : true;
    } else {
      this.needOtherExamDoc = false;
      this.haveOtherExamDoc =  this.testScoreData.OtherExamDocPath === null ||  this.testScoreData.OtherExamDocPath === '' ? false : true;
    }
  }

  onExamTypeChange(reset?: boolean) {
    try {
      if (reset) {
        this.testScoreData.EnglishExamDate = '';
        this.testScoreData.EnglishScoreL = '';
        this.testScoreData.EnglishScoreR = '';
        this.testScoreData.EnglishScoreW = '';
        this.testScoreData.EnglishScoreS = '';
        this.testScoreData.EnglishScoreOverall = '';
        this.testScoreData.EnglishExamUser = '';
        this.testScoreData.EnglishExamPswd = '';
        this.testScoreData.EnglishExamRemark = '';

        this.testScoreData.EnglishExamDocPath = '';
      }
      let data=AppDefaultValue.englishExamRange.find(d => d.Type === this.testScoreData.EnglishExamType);

      if(this.getTime(this.testScoreData.EnglishExamDate)> this.today.getTime()) {
        this.needEnglishExamDoc = true;
        this.haveEnglishExamDoc = (this.testScoreData.EnglishExamDocPath === null || this.testScoreData.EnglishExamDocPath === '')  ? false : true;
        
      }
      if(this.getTime(this.testScoreData.GMATExamDate)> this.today.getTime()) { 
        this.needOtherExamDoc = true;
        this.haveOtherExamDoc = (this.testScoreData.OtherExamDocPath === null || this.testScoreData.OtherExamDocPath === '') ? false : true;
      }

      if(data)
      {
        this.englishExamTypeR =data ;
      }
      else
      {
        this.englishExamTypeR = AppDefaultValue.englishExamRange[0];
      }
      
    }
    catch (e) {
      this.englishExamTypeR = AppDefaultValue.englishExamRange[0];
    }
  }


  onOtherExamChange(reset?: boolean) {

    try {
      if (reset) {
        this.testScoreData.GMATExamDate = '';
        this.testScoreData.ACTScoreEnglish = '';
        this.testScoreData.ACTScoreMath = '';
        this.testScoreData.ACTScoreReading = '';
        this.testScoreData.ACTScoreScience = '';
        this.testScoreData.ACTScoreWriting = '';
        this.testScoreData.ACTScoreTotal = '';

        this.testScoreData.GMATScoreV = '';
        this.testScoreData.GMATScoreQ = '';
        this.testScoreData.GMATScoreA = '';
        this.testScoreData.GMATScoreI = '';

        this.testScoreData.GREScoreV = '';
        this.testScoreData.GREScoreQ = '';
        this.testScoreData.GREScoreW = '';

        this.testScoreData.SATScoreMath = '';
        this.testScoreData.SATScoreEBRW = '';
        this.testScoreData.SATScoreTotal = '';

        this.testScoreData.OtherExamDocPath = '';
      }
    }
    catch (e) {
     // Got exception while emptying the form.
    }
  }

  getTime(d: Date) {
    try {
      if (d) {
        return new Date(d).getTime();
      }
      else {
        return 0;
      }
    }
    catch (e) {
      return 0;
    }

  }

}
