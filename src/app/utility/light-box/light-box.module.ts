import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightBoxComponent } from './light-box.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';



@NgModule({
  declarations: [LightBoxComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  //exports:[LightBoxComponent],
  entryComponents:[LightBoxComponent],
  providers:[ {provide:MAT_DIALOG_DEFAULT_OPTIONS , useValue:{width:'80%',minWidth:'400px', hasBackdrop: true ,disableClose: false}}]
})
export class LightBoxModule { }
