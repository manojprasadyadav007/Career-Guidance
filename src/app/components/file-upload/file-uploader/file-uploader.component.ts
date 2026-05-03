import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, forwardRef } from '@angular/core';
import { environment } from 'environments/environment';
import * as $ from 'jquery';
import { UploadService } from 'app/services/upload.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    }]
})
export class FileUploaderComponent implements OnInit,OnDestroy,ControlValueAccessor {

  @Input()
  file:File;

  @Output()
  fileChange:EventEmitter<File>=new EventEmitter<File>();

  @Input()
  fileType;string='.pdf,.doc,.docx,.csv,.xls,.xlsx,.jpg,.png';

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
  formatError: string;

  defaultSizeLimit= environment.fileSizeLimit;
  private onDestroy$: Subject<void> = new Subject<void>();

  noFile: boolean = false;

  constructor(private uploadService:UploadService) { }

  ngOnInit() {
    if(this.initialFilePath === null || this.initialFilePath === '') {
      this.file = undefined;
    }
  }

  ngOnDestroy()
  {
    this.onDestroy$.next();
    this.onDestroy$.complete();
   }

  onFileChange(fileInput:any)
  {
    this.noFile = false;
    this.sizeerror = '';
    this.formatError = '';
    if(fileInput !== undefined) {
      this.noFile = false;
      if(<File>fileInput.target.files[0] !== undefined) {
        this.file = <File>fileInput.target.files[0];
        const extension = this.file.name.split('.')[1];
        const allowedExtensions = this.fileType.split(',')
        //Check file type
        if(allowedExtensions.includes('.' + extension))
        {
          //Check Size
          if((this.file.size/(1024)) > this.defaultSizeLimit)
          {
            this.sizeerror=`Size limit exceed, max ${this.defaultSizeLimit} KB allowed`;
            this.fileChange.emit(null);
            this.onUploadFinish.emit(null);
          } else {
            this.initialFilePath="";
            this.writeValue(this.initialFilePath);
            this.fileChange.emit(this.file);
            if(this.uploadIndepended)
            {
              this.uploadService.uploadFileWithoutProgress(this.dir,this.file).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
                this.initialFilePath = res[0];
                this.onUploadFinish.emit(this.initialFilePath);
                this.writeValue(this.initialFilePath);
              });
            }
          }
        } else {
          this.formatError=`Only ${this.fileType} file supported`;
          this.fileChange.emit(null);
          this.onUploadFinish.emit(null);
        }
      }
      else {
        this.fileChange.emit(null);
        this.onUploadFinish.emit(null);
      }
    } else {
      this.noFile = true;
      this.initialFilePath = "";
      this.file = null;
      this.fileChange.emit(null);
      this.onUploadFinish.emit(null);
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
