import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { appPattern } from 'app/models/site-map.model';
import { StudentVisaService } from 'app/services/student-visa.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { MiscService } from 'app/services/misc.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-visa-status-add',
  templateUrl: './visa-status-add.component.html',
  styleUrls: ['./visa-status-add.component.scss']
})
export class VisaStatusAddComponent implements OnInit ,OnDestroy {

  countryFilter:any='';
  typeFilter:any='';
  statusFilter:any='';
  formdata: any;
  btnLabel: String = 'Add';
  modelPattern = appPattern;
  countryList: any[];
  visaTypeList: any[];
  maxDate:any;
  visaStatusList: any[];
  permission:number=0;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private studentVisaService: StudentVisaService,
    private dialogRef: MatDialogRef<VisaStatusAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private authService: AuthenticationService,
    private miscService: MiscService
  ) {
   
    this.formdata = {
      StudentVisaId: data.StudentVisaId | 0,
      StudentId: data.StudentId,
      CountryId: 0,
      VisaTypeId: 0,
      VisaStatus: 0,
      IssueDate: '',
      ValidUpto: '',
      Comment: '',
      UserId: authService.currentUserSubject.getValue().UserId,
    }
    this.permission=data.permission;
    this.fillCountry();
    this.fillVisaStatus();
   
    this.get();
    if (data.StudentVisaId) {
      this.btnLabel = 'Update';
    }
  }

  ngOnInit() {
    this.maxDate = new Date();
  }

  save(form:NgForm) {

    if(form.invalid)
    {
      return;
    }

    if (this.formdata.StudentVisaId != 0) {
      this.studentVisaService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
    else {
      this.studentVisaService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
  }

  get() {
    if (this.formdata.StudentVisaId > 0) {
 
      this.studentVisaService.get(this.formdata.StudentVisaId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

        this.formdata.CountryId=res.CountryId;
        this.formdata.VisaTypeId=res.VisaTypeId;
        this.formdata.VisaStatus=res.VisaStatus;
        this.formdata.IssueDate=res.IssueDate;
        this.formdata.ValidUpto=res.ValidUpto;
        this.formdata.Comment=res.Comment;

        this.fillVisaType();

      })
    }
  }

  fillCountry() {
    this.miscService.country().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res;
    });
  }

  fillVisaType() {
    if (this.formdata.CountryId > 0) {
      this.miscService.visaType(this.formdata.CountryId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.visaTypeList = res;
      });
    }
    else {
      this.visaTypeList = [];
    }

  }

  fillVisaStatus() {
    this.miscService.statuslist(7, this.authService.currentUserSubject.getValue().RoleId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.visaStatusList = res;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
