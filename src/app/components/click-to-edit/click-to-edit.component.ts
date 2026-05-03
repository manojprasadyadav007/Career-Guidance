import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-click-to-edit',
  templateUrl: './click-to-edit.component.html',
  styleUrls: ['./click-to-edit.component.scss']
})
export class ClickToEditComponent implements OnInit {

  @Input()
  value:string;

  @Output()
  valueChange:EventEmitter<string> = new EventEmitter();

  editmode:boolean=false;

  @Input()
  label:string;

  @Input()
  placeholder:string;

  constructor() { }

  ngOnInit() {
  }

  setEditable(isEdit:boolean)
  {
      this.editmode=isEdit;
      if(!isEdit)
      {
        this.valueChange.emit(this.value);
      }
  }

}
