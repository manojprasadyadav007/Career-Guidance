import { Component, OnInit, Input, SimpleChange, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppFormControlModel } from 'app/models/app-form-control.model';
import { environment } from 'environments/environment';
import { UploadService } from 'app/services/upload.service';
import { NgForm } from '@angular/forms';
import evaluate from 'ts-expression-evaluator'
import { MatDialog } from '@angular/material';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { appPattern } from 'app/models/site-map.model'
import { AddFormControlComponent } from './add-form-control/add-form-control.component';

@Component({
  selector: 'app-msm-form-control,[app-msm-form-control]',
  templateUrl: './msm-form-control.component.html',
  styleUrls: ['./msm-form-control.component.scss']
})
export class MsmFormControlComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private uploadService: UploadService,
    private matDialog: MatDialog
  ) { }

  @Input()
  control: AppFormControlModel;

  @Input()
  autoFillData: any ;

  @Input()
  DesignMode: boolean = false;

  // user for listrow remove
  @Input()
  parentControl: AppFormControlModel;

  @Input() form: NgForm;

  @Output()
  onEdit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDelete: EventEmitter<number> = new EventEmitter<number>();

  uploadFile: File;

  filePath: string;

  @Input()
  uploadDir: string = 'agent/application'
  modelPattern = appPattern;

  ngOnInit() {
    this.filePath = environment.filepath + this.uploadDir;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['autoFillData'] && changes['autoFillData'].previousValue != changes['autoFillData'].currentValue) {   
      this.getValue();   
    }
  }

  onFileChange(value: File) {
    this.uploadFile = value;

    if (this.uploadFile) {
      this.uploadService.uploadFileWithoutProgress(this.uploadDir, this.uploadFile).pipe(takeUntil(this.onDestroy$))
        .subscribe(res => {
          this.control.FormValue = res[0];
        });
    }
  }

  getValue() {
    if (this.control && this.control.ControlType != 'section' && this.autoFillData) {
      if (this.control.Data.templateField) {
        this.control.FormValue  = evaluate(this.control.Data.templateField, this.autoFillData) //this.autoFillData[this.control.Data.templateField] 
        try{
    if((this.control.FormValue != "null" &&  this.control.FormValue.indexOf('undefined') != -1 )|| (this.control.FormValue != "null" && this.control.FormValue.indexOf('null') != -1) || /^ *$/.test(this.control.FormValue)){
      this.control.FormValue ='' ;
    }
   
   }catch(err){

   }
      
      }
    }
  }


  edit(data?:any) {
      this.matDialog.open(AddFormControlComponent,{data:{formdata:data}}).afterClosed().pipe(takeUntil(this.onDestroy$))
      .subscribe(res=>{
         if(res)
         {
           this.onEdit.emit(res);
         } 
      });
  }

  delete(contorlId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$))
      .subscribe(res => {
        if (res) {
          this.onDelete.emit(contorlId);
        }
      });
  }

  public ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
