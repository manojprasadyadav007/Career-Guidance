import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {

 
  title: string = "MSM";
  content: string = " Are you sure want to delete this?";
  icon: string = "warning";
  yesLabel: string = "Yes";
  noLabel: string = "No";

  
  
  constructor(@Inject(MAT_DIALOG_DATA) data
  ,private matDialogRef:MatDialogRef<ConfirmBoxComponent>) {
    if (data != null) {
      if (data.title != undefined) {
        this.title = data.title;
      }
      if (data.content != undefined) {
        this.content = data.content;
      }
      if (data.icon != undefined) {
        this.icon = data.icon;
      }
      if (data.yesLabel != undefined) {
        this.yesLabel = data.yesLabel;
      }
      if (data.noLabel != undefined) {
        this.noLabel = data.noLabel;
      }
    }
  }

  @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent)
  {
  if(event.key=='y'||event.key=='Y')
  {
  this.matDialogRef.close(true);
  }
  else if(event.key=='n'||event.key=='N'||event.key=== 'Escape')
  {
  this.matDialogRef.close();  
  }
  }
  


 


  ngOnInit() {
      this.matDialogRef.updateSize('400px');
  }
}
