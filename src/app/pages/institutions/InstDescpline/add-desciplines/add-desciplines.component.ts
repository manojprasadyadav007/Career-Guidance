import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { InstitutionDescipline } from 'app/models/inst-desc.model';
import { InstitutionDesciplineService } from 'app/services/institution-descipline.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-add-desciplines',
  templateUrl: './add-desciplines.component.html',
  styleUrls: ['./add-desciplines.component.scss']
})
export class AddDesciplinesComponent implements OnInit , OnDestroy {

  reqList: any[];

  @Input()
  institutionId: number = 0;
  discFilter:any='';
  formdata: InstitutionDescipline;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  flagdisabled:boolean =false;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private instDescService: InstitutionDesciplineService,
    private dialogRef: MatDialogRef<AddDesciplinesComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private miscService:MiscService
  ) {

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
    this.fillDesciplines();
  }
  resetForm() {
    this.formdata = {
      InstDescId: 0,
      DesciplineId: 0,
      InstitutionId: this.institutionId,
      Weightage: 0,
      DesciplineName:''
    };
  }

  fillDesciplines() {
    this.miscService.desciplines().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.reqList = res;
    });
  }

  onSubmit(form: NgForm) {
    this.flagdisabled = true;
    this.instDescService.add(form).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dialogRef.close(true);
    }, err=>{
      this.flagdisabled = false;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
