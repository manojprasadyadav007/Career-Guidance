import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ProgramRequirement } from 'app/models/program-requirement.model';
import { appPattern, AppDefaultValue } from 'app/models/site-map.model';
import { RequirementService } from 'app/services/requirement.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddRequirementComponent } from '../add-requirement/add-requirement.component';
import { InstCountryService } from 'app/services/inst-country.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-add-english-requirement',
  templateUrl: './add-english-requirement.component.html',
  styleUrls: ['./add-english-requirement.component.scss']
})
export class AddEnglishRequirementComponent implements OnInit  , OnDestroy {

  reqList: any[];

  programId: number = 0;

  reqTypeId: number = 1;
  regionFilter:any='';
  reqFilter:any='';
  reqTypeName: string = "English";
  flagdisabled: boolean = false;
  institutionId:number=0;

  formdata: ProgramRequirement;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  modelPattern=appPattern;
  regionList:any[];

  englishExamTypeR:any;


  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private requirementService: RequirementService,
    private dialogRef: MatDialogRef<AddRequirementComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private instCountryService:InstCountryService
  ) {
    
    this.programId = data.programId;
   
    this.institutionId = data.institutionId;
    
    if (data.closeAfterAdd === undefined) {
      this.closeAfterAdd = true;
    }
    else {
      this.closeAfterAdd = data.closeAfterAdd;
    }
  }

  ngOnInit() {

    this.resetForm();
    this.fillReq();
    this.fillRegion();
  }
  
  resetForm() {
    this.formdata = {
      RequirementId: 0,
      ReqId: 0,
      ReqTypeId: this.reqTypeId,
      Score: '',
      ScoreL: '',
      ScoreR: '',
      ScoreW: '',
      ScoreS: '',
      ProgramId: this.programId,
      RegionId:null
    };
  }

  fillReq() {
    this.requirementService.ListRequirement(this.reqTypeId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.reqList = res;
    });
  }

  fillRegion()
  {
    this.instCountryService.list(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.regionList=res;
    });
  }
  ReqStatus(value){
    if(this.formdata.ScoreL || this.formdata.ScoreR || this.formdata.ScoreW || this.formdata.ScoreS ) {
      return !value;
     }
     else{
      return value;
     }
  }

  onSubmit(form: NgForm) {

    if(form.invalid)
    {
      return;
    }
    this.flagdisabled = true;
    this.requirementService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.isAdd = true;
      if (this.closeAfterAdd) {
        this.close();
      }
      else {
        this.flagdisabled =false;
        form.reset();
        this.resetForm();
      }
    }, err =>{
      this.flagdisabled =false;
    });
  }

  close() {
    this.dialogRef.close(this.isAdd);
  }

  onExamTypeChange(reset?:boolean)
  {
    try {
      if(reset)
      {
         this.formdata.ScoreL=null;
         this.formdata.ScoreR=null;
         this.formdata.ScoreW=null;
         this.formdata.ScoreS= null;
         this.formdata.Score=null;
      }
      this.englishExamTypeR = AppDefaultValue.englishExamRange.find(d => d.Type === this.formdata.ReqId);
      if(!this.englishExamTypeR)
      {
        this.englishExamTypeR = AppDefaultValue.englishExamRange[0];
      }
    }
    catch (e) {
      this.englishExamTypeR = AppDefaultValue.englishExamRange[0];
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
