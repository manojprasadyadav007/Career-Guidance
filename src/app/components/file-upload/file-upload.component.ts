import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment';
import * as $ from 'jquery';
import { UploadService } from 'app/services/upload.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit,OnDestroy {

  @Input()
  file:File;

  @Output()
  fileChange:EventEmitter<File>=new EventEmitter<File>();

  @Input()
  fileType;string="*/*"

  @Input()
  dir:string='';

  filepath=environment.filepath;

  @Input()
  initialFilePath:string='';

  @Input()
  controlName:string="fileupload";

  @Input()
  label:string="choose file";

  @Input()
  uploadIndepended:boolean=false;

  @Output()
  onUploadFinish:EventEmitter<string> = new EventEmitter()

  @Input()
  required:boolean=false;

  @Input()
  form:NgForm;
  @Input()
  uploadIconDisable:boolean= false;

  sizeerror:string;

  defaultSizeLimit= environment.fileSizeLimit;
  private onDestroy$: Subject<void> = new Subject<void>();



  constructor(private uploadService:UploadService) { }

  ngOnInit() {
  }

  ngOnDestroy()
  {
    if (this.form) {
      this.form.form.removeControl(this.controlName);
    }
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onFileChange(fileInput:any)
  {
    this.file = <File>fileInput.target.files[0];
    if((this.file.size/(1024))> this.defaultSizeLimit )
    {
      this.sizeerror=`Size limit exceed, max ${this.defaultSizeLimit} KB Allowed`;
      this.file=undefined;
    }
    this.fileChange.emit(this.file);
    if(this.file)
    {
      this.initialFilePath="";
    }
    if(this.uploadIndepended)
    {
        this.uploadService.uploadFileWithoutProgress(this.dir,this.file).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.initialFilePath = res[0];
          this.onUploadFinish.emit(this.initialFilePath);
        });
    }
  }

  changeFile()
  {
    $("#"+this.controlName)[0].click();
  }

  
  
}
