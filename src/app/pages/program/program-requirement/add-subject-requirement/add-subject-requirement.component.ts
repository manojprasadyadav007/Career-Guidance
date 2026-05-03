import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { ProgramRequirement } from 'app/models/program-requirement.model';
import { appPattern } from 'app/models/site-map.model';
import { RequirementService } from 'app/services/requirement.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InstCountryService } from 'app/services/inst-country.service';
import { NgForm } from '@angular/forms';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-add-subject-requirement',
  templateUrl: './add-subject-requirement.component.html',
  styleUrls: ['./add-subject-requirement.component.scss']
})
export class AddSubjectRequirementComponent implements OnInit , OnDestroy {

  reqList: any[];
  gradeList:any[];
  programId: number = 0;
  reqTypeId: number = 2;
  reqTypeName: string = "Subject";
  flagdisabled:boolean = false;
  institutionId:number=0;
  regionFilter:any='';
  gradeFilter:any='';
  gradnFilter:any='';
  boardFilter:any ='';
  provineFilter:any ='';
  formdata: ProgramRequirement;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  modelPattern=appPattern;

  regionList:any[];
  gradeSchemeList:any[];
  gradeSchemeData:any;

  boardList:any[];
  provinceList:any[];
  subFilter:any='';
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private requirementService: RequirementService,
    private dialogRef: MatDialogRef<AddSubjectRequirementComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private instCountryService:InstCountryService,
    private miscService:MiscService
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

    this.miscService.gradeScheme().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.gradeSchemeList = res;
    });

    this.resetForm();
    this.fillGrade();
    this.fillReq();
    this.fillRegion();
  }
  
  resetForm() {
    this.formdata = {
      RequirementId: 0,
      ReqId: 0,
      ReqTypeId: this.reqTypeId,
      Score: '',
      ProgramId: this.programId,
      RegionId:null
    };
  }

  fillReq() {
    this.requirementService.ListRequirement(this.reqTypeId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.reqList = res;
    });
  }
  fillGrade(){
    this.requirementService.ListRequirement(3).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.gradeList = res;
    });
  }

  fillRegion()
  {
    this.instCountryService.list(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.regionList=res;
    });
  }

  onSubmit(form: NgForm) {

    if(form.invalid)
    {
      return;
    }
    this.flagdisabled =true;
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
    },err =>{
      this.flagdisabled =false;
    });
  }

  close() {
    this.dialogRef.close(this.isAdd);
  }

  
  onGradeSchemeChange()
  {
    this.gradeSchemeData = this.gradeSchemeList.find(d=>d.GrdSchemeId===this.formdata.GradeScheme);
  }

  onRegionChange(reset?:boolean)
  {
      this.boardList=[];
      this.provinceList=[];
      if(reset)
      {
        this.formdata.BoardId=null;
        this.formdata.ProvinceId=null;
      }

      if(this.formdata && this.formdata.RegionId>0)
      {
        this.miscService.board(this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.boardList=res;
        });
  
        this.miscService.province(this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.provinceList=res;
        });
      }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
