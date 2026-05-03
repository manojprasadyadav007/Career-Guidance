import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from '../feedback/feedback.component';
import { MatFormFieldModule, MatInputModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  entryComponents:[FeedbackComponent]
})
export class FeedbackModule { }
