import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ShowApplicationDetailedComponent } from './show-application-detailed/show-application-detailed.component';
import { NewApplicationDialogComponent } from './new-application-dialog/new-application-dialog.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { SearchStudentModule } from '../search-student/search-student.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { RemoveSpacesModule } from '../../directive/remove-spaces/removespaces.module';
import { RefundDocumentsComponent } from './refund-documents/refund-documents.component';
import { StudentDocumentModule } from '../students/student-document/student-document.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [
    ShowApplicationDetailedComponent,
    NewApplicationDialogComponent,
    RefundDocumentsComponent
  ],
  entryComponents: [NewApplicationDialogComponent, RefundDocumentsComponent],
  imports: [
    CommonModule, SentenceCaseModule,
    MatDialogModule,
    ApplicationRoutingModule,
    DxDataGridModule,
    SearchStudentModule,
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,
    StudentDocumentModule,
    RemoveSpacesModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule
  ],

})
export class ApplicationModule { }
