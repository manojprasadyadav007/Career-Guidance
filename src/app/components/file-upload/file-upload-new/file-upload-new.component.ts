import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, forwardRef } from '@angular/core';
import { environment } from 'environments/environment';
import * as $ from 'jquery';
import { UploadService } from 'app/services/upload.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-file-upload-new',
  templateUrl: './file-upload-new.component.html',
  styleUrls: ['./file-upload-new.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadNewComponent),
      multi: true
    }]
})
export class FileUploadNewComponent implements OnInit,OnDestroy,ControlValueAccessor {

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

  sizeerror:string;

  defaultSizeLimit= environment.fileSizeLimit;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private uploadService:UploadService) { }

  ngOnInit() {
  }

  ngOnDestroy()
  {
    this.onDestroy$.next();
    this.onDestroy$.complete();
   }

  onFileChange(fileInput:any)
  {
    this.file = <File>fileInput.target.files[0];
    if((this.file.size/(1024))> this.defaultSizeLimit )
    {
      this.sizeerror=`Size limit exceed, max ${this.defaultSizeLimit} KB allowed`;
      this.file=undefined;
    }
    this.fileChange.emit(this.file);
    if(this.file)
    {
      this.initialFilePath="";
    }
    this.writeValue(this.initialFilePath);
    if(this.uploadIndepended)
    {
        this.uploadService.uploadFileWithoutProgress(this.dir,this.file).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.initialFilePath = res[0];
          this.onUploadFinish.emit(this.initialFilePath);
          this.writeValue(this.initialFilePath);
        });
    }
  }

  changeFile()
  {
    $("#"+this.controlName)[0].click();
  }


  onChange: any = () => { };
  onTouched: any = () => { 
    
  };

  get value() {
    return this.initialFilePath;
  }

  set value(val) {
    this.initialFilePath = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) { 
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }


}
