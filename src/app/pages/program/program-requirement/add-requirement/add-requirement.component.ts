import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { RequirementService } from 'app/services/requirement.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProgramRequirement } from 'app/models/program-requirement.model';
import { NgForm } from '@angular/forms';
import { appPattern } from 'app/models/site-map.model';
import { InstCountryService } from 'app/services/inst-country.service';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-add-requirement',
  templateUrl: './add-requirement.component.html',
  styleUrls: ['./add-requirement.component.scss']
})
export class AddRequirementComponent implements OnInit , OnDestroy {

  reqList: any[];

  @Input()
  programId: number = 0;

  @Input()
  reqTypeId: number = 0;

  @Input()
  reqTypeName: string = "";

  institutionId:number=0;

  formdata: ProgramRequirement;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  modelPattern=appPattern;
  flagdisabled:boolean =false;
  regionList:any[];
  gradeSchemeList:any[];
  regionFilter:any;
  gradingFilter:any;
  academicFilter:any;
  
  gradeSchemeData:any;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private requirementService: RequirementService,
    private dialogRef: MatDialogRef<AddRequirementComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private instCountryService:InstCountryService,
    private miscService:MiscService
  ) {
    
    this.programId = data.programId;
    this.reqTypeId = data.reqTypeId;
    this.reqTypeName = data.reqTypeName;
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
      RegionId:null,
      GradeScheme:null
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

  onSubmit(form: NgForm) {
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
      this.flagdisabled = false;
    });
  }

  close() {
    this.dialogRef.close(this.isAdd);
  }

  onGradeSchemeChange()
  {
    this.gradeSchemeData = this.gradeSchemeList.find(d=>d.GrdSchemeId===this.formdata.GradeScheme);
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
