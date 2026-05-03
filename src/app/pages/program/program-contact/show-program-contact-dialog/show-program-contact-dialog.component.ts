import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-program-contact-dialog',
  templateUrl: './show-program-contact-dialog.component.html',
  styleUrls: ['./show-program-contact-dialog.component.scss']
})
export class ShowProgramContactDialogComponent implements OnInit {

  programId:number;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.programId = data.programId;
   }

  ngOnInit() {
  }

}
