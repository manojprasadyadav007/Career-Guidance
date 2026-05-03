import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedbackService } from 'app/services/feedback.service';
import { NgForm } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { MatDialogRef } from '@angular/material';
import { ScreenshotService } from 'app/services/screenshot.service';
import {  appPattern } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit,OnDestroy {

  formdata={Message:'',AttachmentPath:''}
  modelPattern = appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private feedbackService:FeedbackService,
    private toasterService:ToasterService,
    private matDialogRef: MatDialogRef<FeedbackComponent>,
    private screenShotService:ScreenshotService
    ) { 

    }

  ngOnInit() {
  }

  onSubmit(form?:NgForm)
  {
    this.feedbackService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.toasterService.pop('success','Feedback submitted successfully');
        this.matDialogRef.close();
    });
  }

  onScreenshotCheckChange(isChecked:boolean)
  {
      if(!isChecked)
      {
        this.formdata.AttachmentPath='';
      }
      else
      {
         this.screenShotService.output.pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
           this.formdata.AttachmentPath = res.name;
         });
      }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
