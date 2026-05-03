import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { InstituteMaterialService } from 'app/services/institute-material.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MiscService } from 'app/services/misc.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { UploadService } from 'app/services/upload.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { appPattern } from 'app/models/site-map.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-institution-material-add',
  templateUrl: './institution-material-add.component.html',
  styleUrls: ['./institution-material-add.component.scss']
})
export class InstitutionMaterialAddComponent implements OnInit, OnDestroy {

  formdata: any;
  materialFile: File;
  btnLabel: String = 'Add';
  regionList: any[];
  regionFilter: any = '';
  checkTersm = false;
  flagdisabled: boolean = false;
  haveFileDoc: boolean = false;
  modelPattern = appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private instMaterialService: InstituteMaterialService,
    private dialogRef: MatDialogRef<InstitutionMaterialAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    authService: AuthenticationService,
    private uploadService: UploadService,
    private instCountryService: InstCountryService
  ) {

    this.formdata = {
      MaterialId: data.MaterialId | 0,
      InstitutionId: data.InstitutionId,
      MaterialTitle: '',
      MaterialDescription: '',
      MaterialPath: '',
      UserId: authService.currentUserSubject.getValue().UserId,
      RegionId: null,
    }
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
        this.uploadService.uploadFileWithoutProgress("institution", this.materialFile).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.formdata.MaterialPath = res[0];
          this.materialFile = undefined;
          this.save();
        })
        return;
      }

      this.flagdisabled = true;

      if (this.formdata.MaterialId != 0) {
        this.instMaterialService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.dialogRef.close(true);
        }, err => {
          this.flagdisabled = false;
        });
      }
      else {
        this.instMaterialService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
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

      this.instMaterialService.get(this.formdata.MaterialId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.checkTersm = true;
        this.formdata.MaterialTitle = res.MaterialTitle;
        this.formdata.MaterialDescription = res.MaterialDescription;

      })
    }
  }

  fillRegion() {
    this.instCountryService.list(this.formdata.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.regionList = res;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  uploadMaterialFile(e: any) {
    if (e !== null) {
      this.formdata.MaterialPath = e;
      this.haveFileDoc = true;
    } else {
      this.formdata.MaterialPath = '';
      this.haveFileDoc = false;
    }
  }
}
