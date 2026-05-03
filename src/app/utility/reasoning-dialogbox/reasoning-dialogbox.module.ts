import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReasoningDialogboxComponent } from './reasoning-dialogbox.component';
import { MatFormFieldModule, MatInputModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReasoningDialogboxComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  entryComponents:[ReasoningDialogboxComponent]
})
export class ReasoningDialogboxModule { }
