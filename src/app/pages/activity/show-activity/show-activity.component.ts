import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-activity',
  templateUrl: './show-activity.component.html',
  styleUrls: ['./show-activity.component.scss']
})
export class ShowActivityComponent implements OnInit {

  @Input()
  activityList:any[];
  
  constructor() { }

  ngOnInit() {
   
  }

}
