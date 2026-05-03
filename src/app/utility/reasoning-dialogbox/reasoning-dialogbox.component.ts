import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import {  appPattern } from 'app/models/site-map.model';

@Component({
  selector: 'app-reasoning-dialogbox',
  templateUrl: './reasoning-dialogbox.component.html',
  styleUrls: ['./reasoning-dialogbox.component.scss']
})
export class ReasoningDialogboxComponent implements OnInit {


  formdata:any ={};
  modelPattern = appPattern;
  title: string = "Remark";
  yesLabel: string = "Submit";
  noLabel: string = "Cancel";
  constructor(@Inject(MAT_DIALOG_DATA) data
  ,private matDialogRef:MatDialogRef<ReasoningDialogboxComponent>) { 
    if (data != null) {
      if (data.title != undefined) {
        this.title = data.title;
      }
      if (data.yesLabel != undefined) {
        this.yesLabel = data.yesLabel;
      }
      if (data.noLabel != undefined) {
        this.noLabel = data.noLabel;
      }
    }
  }

  ngOnInit() {
  }

  onSubmit(event){
    this.matDialogRef.close({ data: event })
  }
}
