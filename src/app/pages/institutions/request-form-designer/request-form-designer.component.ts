import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstituteService } from 'app/services/institute.service';
import { InstituionApplicationFormService } from 'app/services/instituion-application-form.service';
import {  MatDialog } from '@angular/material';
import { UploadService } from 'app/services/upload.service';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';
import { AddFormControlComponent } from 'app/components/msm-form-control/add-form-control/add-form-control.component';
@Component({
  selector: 'app-request-form-designer',
  templateUrl: './request-form-designer.component.html',
  styleUrls: ['./request-form-designer.component.scss']
})
export class RequestFormDesignerComponent implements OnInit, OnDestroy {

  instList: any[];
  controlList: any[];
  institionId: number = 0;
  instFilter: any = '';
  printFile: File;
  private onDestroy$: Subject<void> = new Subject<void>();
  currentUser: Login;

  constructor(private instService: InstituteService,
    private instAppFormService: InstituionApplicationFormService,
    private uploadService: UploadService,
    private toasterService: ToasterService,
    authService: AuthenticationService,
    private router: Router,
    private matDialog:MatDialog
  ) {
    this.currentUser = authService.currentUserSubject.getValue();
  }

  ngOnInit() {
    if (this.currentUser.RoleId != 1) {
      this.router.navigate(['/member/dashboard']);
    }
    this.instService.list('').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.instList = res;
    });
  }

  uploadFile() {
    if (this.printFile) {
      this.uploadService.uploadFileWithoutProgress("ApplicationFormats", this.printFile)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {

        this.instAppFormService.upload({ InstitutionId: this.institionId, FilePath: res[0] })
        .pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
          this.toasterService.pop('success', 'Print file uploaded successfully');
          this.printFile = undefined;
        })
      });
    }
  }

  fillInstForm() {
    this.instAppFormService.get(this.institionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.controlList = res;
    });

  }


  // updateValidtor() {
  //   this.controlList.forEach((data) => {
  //     const obj = { "value": "", "message": "invalid value" };
  //     const reqObj = { "value": false, "message": "this field is required" };
  //     if (data.ControlType == 'checkbox' || data.ControlType == 'section') {
  //       if (data.Data.validation.hasOwnProperty('required')) {
  //         if (data.Data.validation.required.hasOwnProperty('value') != "") {
  //           data.Data.validation.required = reqObj;
  //         }
  //       } else {
  //         data.Data.validation.required = reqObj;
  //       }
  //     }
  //     else {
  //       if (data.Data.validation.hasOwnProperty('required')) {
  //         data.Data.validation.required = { "value": true, "message": "this field is required" };
  //       } else {
  //         data.Data.validation['required'] = { "value": true, "message": "this field is required" };
  //       }
  //     }

  //     if (data.Data.validation.hasOwnProperty('pattern')) {
  //     } else { data.Data.validation['pattern'] = obj; }
  //     if (data.Data.validation.hasOwnProperty('minValue')) {
  //     } else {
  //       data.Data.validation['minValue'] = obj;
  //     }
  //     if (data.Data.validation.hasOwnProperty('maxValue')) {
  //     } else {
  //       data.Data.validation['maxValue'] = obj;
  //     }
  //     if (data.Data.validation.hasOwnProperty('minLength')) {
  //     } else {
  //       data.Data.validation['minLength'] = { "value": "", "message": "" }
  //     }
  //     if (data.Data.validation.hasOwnProperty('maxLength')) {
  //     } else {
  //       data.Data.validation['maxLength'] = { "value": "", "message": "" }
  //     }
  //     this.instAppFormService.update(data)
  //     .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
  //     });

  //   });

  // }

  // resetForm() {
  //   this.btnLabel = 'Add';
  //   return {
  //     ControlId: 0, ControlLabel: '', ControlType: null, RowNumber: null, ColumnNumber: null,
  //     FormValue: '',
  //     Data: {
  //       controlClass: 'col-md-12',
  //       templateField: '',
  //       option: [],
  //       validation: {
  //         required: { value: false, message: 'this field is required' },
  //         pattern: { value: '', message: 'invalid value' },
  //         minValue: {
  //           value: '',
  //           message: "invalid value"
  //         },
  //         maxValue: {
  //           value: '',
  //           message: "invalid value"
  //         },
  //         minLength: {
  //           value: '',
  //           message: ''
  //         },
  //         maxLength: {
  //           value: '',
  //           message: ''
  //         }
  //       }
  //     }
  //   };
  // }

  add() {
    let lastControl;
    try {
      if (this.controlList.length > 0) {
        lastControl= this.controlList[this.controlList.length - 1];
      }
    }
    catch (e) {

    }

    this.matDialog.open(AddFormControlComponent,{data:{lastControl:lastControl}}).afterClosed()
    .pipe(takeUntil(this.onDestroy$))
      .subscribe(res=>{
         if(res)
         {
            this.edit(res);
         } 
      });
  }

  delete(ControlId: number) {
    this.instAppFormService.delete(ControlId)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.fillInstForm();
    });
  }

  edit(data: any) {
    if (data.ControlId > 0) {
      this.instAppFormService.update(data)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.fillInstForm();
      });
    }
    else {
      data.InstitutionId = this.institionId;
      this.instAppFormService.add(data)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.fillInstForm();
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
