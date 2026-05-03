import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { appPattern } from 'app/models/site-map.model';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent implements OnInit {

  @Output()
  onSubmit=new EventEmitter<void>();

  remarkLabel_error:any="query";
  
  @Input()
  btnLable:string="Submit";
  @Input()
  selectList:any[]

  @Input()
  showStatusDropDown:boolean=false;
  statusFilter :any ='';
  @Input()
  showPrioirtyDropDown:boolean=false;

  @Input()
  @Output()
  formdata:any;

  modelPattern=appPattern;

  @Input()
  remarkLabel:string="Write your query here....";

  @Input()
  titleForLabel:string;

  @Input()
  remarkRequired:boolean=true;

  constructor() { }

  ngOnInit() {
    if(this.titleForLabel=='Comment')
    {
      this.remarkLabel="Write your comment here...";
      this.remarkLabel_error="comment"
    }
  }

  formSubmit(form:NgForm)
  {
      this.onSubmit.emit();
     form.reset();
  }
}
