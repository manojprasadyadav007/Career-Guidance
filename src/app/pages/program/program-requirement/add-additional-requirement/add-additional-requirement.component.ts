import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ProgramRequirement } from 'app/models/program-requirement.model';
import { RequirementService } from 'app/services/requirement.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { appPattern } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import {  editorlist } from 'app/models/site-map.model';
@Component({
  selector: 'app-add-additional-requirement',
  templateUrl: './add-additional-requirement.component.html',
  styleUrls: ['./add-additional-requirement.component.scss']
})
export class AddAdditionalRequirementComponent implements OnInit , OnDestroy {

  programId: number = 0;

  reqTypeId: number = 0;

  regionFilter:any='';
  reqTypeName: string = "Additional";

  institutionId:number=0;
  flagdisabled:boolean =false;
  formdata: ProgramRequirement;
  isAdd: boolean = false;
  closeAfterAdd: boolean;

  regionList:any[];

  modelPattern=appPattern;
  popupVisible: boolean;
  items: any = Object.assign([], editorlist);
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private requirementService: RequirementService,
    private dialogRef: MatDialogRef<AddAdditionalRequirementComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private instCountryService:InstCountryService,
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
    this.resetForm();
    this.fillRegion();
    this.items.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
  })
  }
  
  resetForm() {
    this.formdata = {
      RequirementId: 0,
      ReqId: 0,
      ReqTypeId: this.reqTypeId,
      Score: '',
      ProgramId: this.programId,
      RegionId:null,
      AdditionalReq:''
    };
  }


  fillRegion()
  {
    this.instCountryService.list(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.regionList=res;
    });
  }

  onSubmit(form: NgForm) {
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
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
