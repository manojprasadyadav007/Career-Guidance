import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStudentComponent } from './search-student.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [SearchStudentComponent,],
  imports: [
    CommonModule, SentenceCaseModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule, DxDataGridModule
  ],
  entryComponents: [SearchStudentComponent]
})
export class SearchStudentModule { }
