import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ProgramDocumentService } from 'app/services/program-document.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppDefaultValue, appPattern } from 'app/models/site-map.model';
import { InstCountryService } from 'app/services/inst-country.service';
import { MiscService } from 'app/services/misc.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-add-program-document',
  templateUrl: './add-program-document.component.html',
  styleUrls: ['./add-program-document.component.scss']
})
export class AddProgramDocumentComponent implements OnInit , OnDestroy {

  programId: number = 0;
  formdata: any;

  documentList:any[];
  regionFilter:any='';
  docFilter:any='';
  modelPattern=appPattern;
  flagdisabled:boolean =false;
  regionList:any[];
  institutionId:number=0;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private programDocumentService: ProgramDocumentService,
    private dialogRef: MatDialogRef<AddProgramDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private instCountryService:InstCountryService,
    private miscService:MiscService
  ) {
    this.programId = data.programId;
    this.institutionId = data.institutionId;
  }

  ngOnInit() {
    this.formdata = {
      DocumentTypeId: null,
      ProgramId: this.programId,
    };
    this.fillRegion();
    
    this.miscService.document(7).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.documentList=res;
    });
  }
  onSubmit(form:NgForm) {

    if(form.invalid)
    {
      return;
    }
    this.flagdisabled =true;
    this.programDocumentService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dialogRef.close(true);
    },err =>{
      this.flagdisabled = false;
    });
  }

  fillRegion()
  {
    this.instCountryService.list(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.regionList=res;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
