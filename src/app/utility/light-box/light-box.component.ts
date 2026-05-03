import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-light-box',
  templateUrl: './light-box.component.html',
  styleUrls: ['./light-box.component.scss']
})
export class LightBoxComponent implements OnInit {
data:any;
invalidFields:any = [];
  constructor( @Inject(MAT_DIALOG_DATA)  data ,
  private matDialogRef:MatDialogRef<LightBoxComponent>) {
    for(var key in data){
      if(data[key].status === "INVALID"){
        var keyName = key.toString().replace( /([a-z])([A-Z])/g, "$1 $2");
        this.invalidFields.push({'name': keyName });
      }
  }
   }

  ngOnInit() {
  }

}
