import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-institution-material-dialog',
  templateUrl: './show-institution-material-dialog.component.html',
  styleUrls: ['./show-institution-material-dialog.component.scss']
})
export class ShowInstitutionMaterialDialogComponent implements OnInit {
 
  instituteId:number;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.instituteId = data.instituteId;
   }


  ngOnInit() {
  }

}
