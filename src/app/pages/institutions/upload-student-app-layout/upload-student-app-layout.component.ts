import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { InstititionApplicationFieldService } from 'app/services/institition-application-field.service';
import { InstituteService } from 'app/services/institute.service';
import { UploadService } from 'app/services/upload.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-upload-student-app-layout',
  templateUrl: './upload-student-app-layout.component.html',
  styleUrls: ['./upload-student-app-layout.component.scss']
})
export class UploadStudentAppLayoutComponent implements OnInit,OnDestroy {
  instList: any[];
  institionId: number = 0;
  instFilter: any = '';
  printFile: File;
  printCCFile: File;
  private onDestroy$: Subject<void> = new Subject<void>();
  
  constructor(private instService: InstituteService,
    private uploadService: UploadService,
    private instAppFormService:InstititionApplicationFieldService,
    private toasterService: ToasterService,
    ) { }

  ngOnInit() {
    this.instService.list('').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.instList = res;
    });
  }

  uploadFile() {
    if (this.printFile) {
      this.uploadService.uploadFileWithoutProgress("StudentApplicationFormats", this.printFile)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {

        this.instAppFormService.upload({ InstitutionId: this.institionId, FilePath: res[0] })
        .pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
          this.toasterService.pop('success', 'Print file uploaded successfully');
          this.printFile = undefined;
        })
      });
    }
  }

  uploadCCFile() {
    if (this.printCCFile) {
      this.uploadService.uploadFileWithoutProgress("StudentApplicationFormats", this.printCCFile)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {

        this.instAppFormService.uploadCC({ InstitutionId: this.institionId, FilePath: res[0] })
        .pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
          this.toasterService.pop('success', 'CC Print file uploaded successfully');
          this.printCCFile = undefined;
        })
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  deleteCCFile()
  {
    this.instAppFormService.deleteCC({ InstitutionId: this.institionId })
    .pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
      this.toasterService.pop('success', 'CC Print file delete successfully');
      this.printCCFile = undefined;
    })
  }
}
