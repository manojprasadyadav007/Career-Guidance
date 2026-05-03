import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmBoxComponent } from './confirm-box.component';
import { MatDialogModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [ConfirmBoxComponent],
  imports: [
    CommonModule,MatDialogModule,MatIconModule,
  ],
  entryComponents:[ConfirmBoxComponent]
})
export class ConfirmBoxModule { }
