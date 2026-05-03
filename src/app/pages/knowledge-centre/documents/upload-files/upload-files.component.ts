import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'app/services/upload.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { appPattern } from 'app/models/site-map.model';
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit , OnDestroy {

  progress: number = 0;
  dirPath: string = '';
  DocumentFile: File;
  formdata: any;
  flagdisable: boolean = false;
  documentList: any[];
  modelPattern = appPattern;
  doumntFilter: any = '';
  documentName: string = '';
  isDisabled: boolean = false;
  sizeerror: string;
  displayDocList: any[];

  duplicateName: boolean;
  defaultSizeLimit = environment.fileSizeLimit;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private dialogref: MatDialogRef<UploadFilesComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private uploadService: UploadService,
    //private miscService: MiscService
  ) {
    this.dirPath = data.uploaddir;
    this.documentList = data.documentList;
    if (data.displayDocList) {
     
      this.displayDocList = data.displayDocList
    }
    if (data.DocumentName) {
      this.documentName = data.DocumentName;
      this.isDisabled = true;
    }

  }


  ngOnInit() {
    this.formdata = { DocPath: '', DocumentName: this.documentName };
  }

  upload() {

    this.flagdisable = true;
    this.uploadService.uploadFile(this.dirPath, this.DocumentFile).pipe(takeUntil(this.onDestroy$)).subscribe((res: HttpEvent<any>) => {

      if (res.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * res.loaded) / res.total);
      }
      else if (res.type === HttpEventType.Response) {
        this.flagdisable = false;
        this.dialogref.close({ DocPath: res.body[0], DocumentName: this.formdata.DocumentName, newfile: true });

      }
    }
    );
  }
  cancel() {
    this.dialogref.close();
  }

  checkFileName(event) {
   
     if(!this.displayDocList) return false ;
    const data = this.displayDocList.filter((item) => item.DocumentName.toString().toLowerCase() === this.formdata.DocumentName.toString().toLowerCase());
    if (data.length > 0) {
      this.duplicateName = true;
      return;
    }
    this.duplicateName = false;
  }

  fileChange(fileInput: any) {
    this.flagdisable = false;
    this.sizeerror = undefined;
    if (fileInput.target.files[0]) {
      this.DocumentFile = <File>fileInput.target.files[0];
      if ((this.DocumentFile.size / (1024)) > this.defaultSizeLimit) {
        this.sizeerror = `Size limit exceed, max ${this.defaultSizeLimit} KB Allowed`;
        this.DocumentFile = undefined;
      }
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
