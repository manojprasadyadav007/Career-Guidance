import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
 
@Component({
  selector: 'app-display-queries-attachments',
  templateUrl: './display-queries-attachments.component.html',
  styleUrls: ['./display-queries-attachments.component.scss']
})
export class DisplayQueriesAttachmentsComponent implements OnInit {

  permission:number=0;

  transactionId:number;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
  ) { 
    this.transactionId = data.transactionId;

    this.permission = data.permission |0;
  }

  ngOnInit() {
  }

}
