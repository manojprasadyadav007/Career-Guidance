import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermAndConditionDisplayComponent } from './term-and-condition-display.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [TermAndConditionDisplayComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: TermAndConditionDisplayComponent }])
  ]
})
export class TermAndConditionDisplayModule { }
