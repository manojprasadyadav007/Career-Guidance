import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ProgramMaterialService } from 'app/services/program-material.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { UploadService } from 'app/services/upload.service';
import { appPattern } from 'app/models/site-map.model';
import { InstCountryService } from 'app/services/inst-country.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-program-material-add',
  templateUrl: './program-material-add.component.html',
  styleUrls: ['./program-material-add.component.scss']
})
export class ProgramMaterialAddComponent implements OnInit, OnDestroy {

  formdata: any;
  materialFile: File;
  btnLabel: String = 'Add';
  regionFilter: any = '';
  regionList: any[];
  checkTersm = false;
  modelPattern = appPattern;
  institutionId: number;
  flagdisabled: boolean = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private programMaterialService: ProgramMaterialService,
    private dialogRef: MatDialogRef<ProgramMaterialAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    authService: AuthenticationService,
    private uploadService: UploadService,
    private instCountryService: InstCountryService
  ) {

    this.formdata = {
      MaterialId: data.MaterialId | 0,
      ProgramId: data.ProgramId,
      MaterialTitle: '',
      MaterialDescription: '',
      MaterialPath: '',
      UserId: authService.currentUserSubject.getValue().UserId,
      RegionId: 0,
      checkTermsandServices: false,

    }

    this.institutionId = data.institutionId;

    this.fillRegion();
    this.get();
    if (data.MaterialId) {
      this.btnLabel = 'Update';
    }
  }

  ngOnInit() {

  }

  save(form?: NgForm) {

    if (form) {
      if (form.invalid) {
        return;
      }
      if ((!this.materialFile && this.formdata.MaterialId === 0)) {
        return;
      }
    }
    if (this.checkTersm) {
      if (this.materialFile) {
        this.flagdisabled =true;
        this.uploadService.uploadFileWithoutProgress("program", this.materialFile).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.formdata.MaterialPath = res[0];
          this.materialFile = undefined;
          this.save();
        }, err => {
          this.flagdisabled = false;
        })
        return;
      }
      if (this.formdata.MaterialId != 0) {
        this.flagdisabled =true;
        this.programMaterialService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.dialogRef.close(true);
        }, err => {
          this.flagdisabled = false;
        });
      }
      else {
        this.flagdisabled =true;
        this.programMaterialService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.dialogRef.close(true);
        }, err => {
          this.flagdisabled = false;
        });
      }
    } else {
      this.checkTersm = false;
    }
  }

  get() {
    if (this.formdata.MaterialId > 0) {

      this.programMaterialService.get(this.formdata.MaterialId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.checkTersm = true;
        this.formdata.MaterialTitle = res.MaterialTitle;
        this.formdata.MaterialDescription = res.MaterialDescription;
        this.formdata.RegionId = res.RegionId;

      })
    }
  }

  fillRegion() {
    this.instCountryService.list(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.regionList = res;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
