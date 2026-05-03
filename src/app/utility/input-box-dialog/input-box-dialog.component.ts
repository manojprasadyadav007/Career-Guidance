import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { appPattern } from 'app/models/site-map.model';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-input-box-dialog',
  templateUrl: './input-box-dialog.component.html',
  styleUrls: ['./input-box-dialog.component.scss']
})
export class InputBoxDialogComponent implements OnInit,OnDestroy {

  inputText:string='';
  valueName:string='Provide Input Here';
  title:'Input Box';
  required:boolean=false;
 
 // this.programInfoData.ProgramId
  showCancel:boolean=true;
  cancelLabel:string='Cancel';
  intekList:any=[];
  okLabel:string='OK';
  pattern:any =  appPattern.alphaNumericWithSpecialCharacters
  requiredMessage:string='This field is required';
  patternMessage:string='Enter valid value';
  extraHTML:string;
  ProgramId:number ;
  ApplicationId: number = 0;
  CountryId: number = 0;
  status:string = "undefined";
  IntekId:any;
  IntakeId :any;
  private onDestroy$: Subject<void> = new Subject<void>();
  
  constructor(@Inject(MAT_DIALOG_DATA) data
  ,private matDialogRef:MatDialogRef<InputBoxDialogComponent>,
  private programIntekService : ProgramIntekService) {
    if(data)
    {
       if(data.title)
       {
          this.title=data.title;
       }
       if(data.valueName)
       {
          this.valueName=data.valueName;
       }
       if(data.required)
       {
          this.required = data.required;
       }
       if(data.requiredMessage)
       {
          this.requiredMessage = data.requiredMessage;
       }
       if(data.pattern)
       {
          this.pattern = data.pattern;
       }
       if(data.patternMessage)
       {
          this.patternMessage = data.patternMessage;
       }
       if(data.cancelLabel)
       {
          this.cancelLabel=data.cancelLabel;
       }
       if(data.okLabel)
       {
          this.okLabel=data.okLabel;
       }
       if(data.showCancel)
       {
          this.showCancel = data.showCancel;
       }
       if(data.extraHTML)
       {
          this.extraHTML = data.extraHTML;
       }
       if(data.Status){
            this.status =data.Status.toLowerCase();
       }
       if(data.programID){
         this.ProgramId =data.programID;
       }
       if(data.intakeId){
         this.IntakeId =data.intakeId
       }
    }
   }

  ngOnInit() {
   this.status != "undefined" ? this.getIntake() : '';

   this.matDialogRef.updateSize('400px');
  }
  cancelClick(): void {
  this.matDialogRef.close(false);
  }
  getIntake(){
   this.programIntekService.programIntakeForApplication(this.ProgramId, this.ApplicationId, this.CountryId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.intekList = res;
    });
  }
  OkClick(){
     if(this.IntakeId ){
      let  res = {inputText : this.inputText , IntakeName :  this.IntakeId};
      this.matDialogRef.close(res);
     }
     else{
      this.matDialogRef.close(this.inputText);
     }

         
  }

  ngOnDestroy(): void {
   this.onDestroy$.next();
   this.onDestroy$.complete();
 }


}
