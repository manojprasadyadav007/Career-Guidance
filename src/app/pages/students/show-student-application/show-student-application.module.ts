import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowStudentApplicationComponent } from './show-student-application.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [ShowStudentApplicationComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    DxDataGridModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ShowStudentApplicationComponent]
})
export class ShowStudentApplicationModule { }
