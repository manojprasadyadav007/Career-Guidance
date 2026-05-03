import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-tearm-and-conditions',
  templateUrl: './view-tearm-and-conditions.component.html',
  styleUrls: ['./view-tearm-and-conditions.component.scss']
})
export class ViewTearmAndConditionsComponent implements OnInit {

  content:string;
  constructor( @Inject(MAT_DIALOG_DATA) data,) { 
    this.content = data.content;
  }

  ngOnInit() {
  }

}
