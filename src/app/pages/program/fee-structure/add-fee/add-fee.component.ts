import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { environment } from 'environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { NgForm } from '@angular/forms';
import { ProgramFeeService } from 'app/services/program-fee.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { appPattern, AppDefaultValue } from 'app/models/site-map.model';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.scss']
})
export class AddFeeComponent implements OnInit , OnDestroy{

  programId: number = 0;
  formdata: any;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  btnLable: string = "Add";
  currentUser:Login;
  env:any=environment;
  regionList:any[]
  instituionId:number=0;
  IntakeFilter:any='';
  feeFilter:any='';
  regionFilter:any='';
  basicFilter:any = '';
  intakeList:any[];
  flagdisabled:boolean = false;
  modelPattern = appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  feeTypeList=AppDefaultValue.appFeeType;
  feeBasisList=AppDefaultValue.appFeeBasis;
  constructor(private feeService: ProgramFeeService,
    private dialogRef: MatDialogRef<AddFeeComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private authService:AuthenticationService,
    private instCountry:InstCountryService,
    private intakeService:ProgramIntekService
  ) {

    this.instituionId = data.instituionId;
    this.programId = data.programId;
     
    this.formdata = { 
      FeeId: data.FeeId, 
      ProgramId: data.programId, 
      FeeType:'',
      FeeBasis: '', 
      FeeAmount: 0,
      UserId:0,
      RegionId:null,
      Deadline:'',
      TAT:'',
      IntakeId:0
    };

    if (data.closeAfterAdd === undefined) {
      this.closeAfterAdd = true;
    }
    else {
      this.closeAfterAdd = data.closeAfterAdd;
    }
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.intakeService.list(this.programId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.intakeList = res;
    });
    this.fillRegion();
    if (this.formdata.FeeId > 0) {
      this.get();
    }
  }

  resetForm() {

    this.formdata = {
      FeeId: 0,
      FeeType:'',
      FeeBasis: '',
      ProgramId: this.programId,
      FeeAmount: 0,
      RegionId:-1,
      Deadline:''
    };
  }

  onSubmit(form: NgForm) {
  if(form.invalid)
  {
    return;
  }
    this.flagdisabled = true;
    if(this.formdata.FeeType!='Application Fee' || this.formdata.IntakeId>0)
    {
      this.formdata.RegionId=0;
    }

    if (this.formdata.FeeId > 0) {
      this.feeService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.isAdd = true;
        this.close();
      },err =>{
        this.flagdisabled = false;
      });
    }
    else {

      this.feeService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

        this.isAdd = true;
        if (this.closeAfterAdd) {
          this.close();
        }
        else {
          this.flagdisabled = false;
          form.reset();
          this.resetForm();
        }
      },err=>{
        this.flagdisabled =false;
      });
    }

  }

  close() {
    this.dialogRef.close(this.isAdd);
  }

  get() {
    this.feeService.get(this.formdata.FeeId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formdata = res;
      this.btnLable = "Update";
    });
  }

  fillRegion()
  {
     this.instCountry.list(this.instituionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
       this.regionList=res;
     })
  }

  onFeeTypeChange()
  {
    if(this.formdata.FeeType==='Application Fee' || this.formdata.FeeType==='Registration Fee')
    {
       this.formdata.FeeBasis ='one-time';
    }
    else
    {
      this.formdata.FeeBasis =null;
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
