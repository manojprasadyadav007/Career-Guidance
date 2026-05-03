import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-program-material-dialog',
  templateUrl: './show-program-material-dialog.component.html',
  styleUrls: ['./show-program-material-dialog.component.scss']
})
export class ShowProgramMaterialDialogComponent implements OnInit {

  programId:number;
  instituteId:number;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.instituteId = data.instituteId;
    this.programId = data.programId;
   }

  ngOnInit() {

  }

}
