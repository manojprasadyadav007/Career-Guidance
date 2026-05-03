import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UploadService } from 'app/services/upload.service';
import { ToasterService } from 'angular2-toaster';
import { InstititionApplicationFieldService } from 'app/services/institition-application-field.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AddFormControlComponent } from 'app/components/msm-form-control/add-form-control/add-form-control.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-application-form-additional-field',
  templateUrl: './application-form-additional-field.component.html',
  styleUrls: ['./application-form-additional-field.component.scss']
})
export class ApplicationFormAdditionalFieldComponent implements OnInit , OnDestroy {

  controlList:any[];

  @Input()
  InstitutionId:number=0;

  printFile:File;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private instAppFormService:InstititionApplicationFieldService,
    private uploadService:UploadService,
    private toasterService:ToasterService,
    private matDialog:MatDialog) { }

  ngOnInit() {
    this.fillInstForm();
  }


  uploadFile()
  {
      if(this.printFile)
      {
         this.uploadService.uploadFileWithoutProgress("StudentApplicationFormats",this.printFile)
         .pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          
             this.instAppFormService.upload({InstitutionId:this.InstitutionId,FilePath:res[0]}).pipe(takeUntil(this.onDestroy$)).subscribe(res1=>{
                 this.toasterService.pop('success','Print file uploaded successfully');
                 this.printFile=undefined;
             })
         });
      }
  }

  fillInstForm()
  {
      this.instAppFormService.get(this.InstitutionId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.controlList = res;
      });
  }

  add(){
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

  delete(ControlId:number)
  {
     this.instAppFormService.delete(ControlId)
     .pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.fillInstForm();
     });
  }

  edit(data:any)
  {
    if(data.ControlId>0)
    {
      this.instAppFormService.update(data)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.fillInstForm();
      });
    }
    else
    {
      data.InstitutionId=this.InstitutionId;

      this.instAppFormService.add(data)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.fillInstForm();
      });
    }

  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
