import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { MatTabsModule, MatIconModule, MatDialogModule } from '@angular/material';
import { ComponentsModule } from 'app/components/components.module';
import { AttendeModule } from '../attende/attende.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { ActivityModule } from '../activity/activity.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { StudentDocumentModule } from '../students/student-document/student-document.module';
import { DocumentsModule } from '../knowledge-centre/documents/documents.module';
import { RemoveSpacesModule } from '../../directive/remove-spaces/removespaces.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [TaskComponent, TaskAddComponent,],
  imports: [
    CommonModule, SentenceCaseModule,
    ComponentsModule,
    MatTabsModule,
    AttendeModule,
    MatIconModule,
    MatDialogModule,
    DxDataGridModule,
    ActivityModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,

    StudentDocumentModule,
    DocumentsModule,
    RemoveSpacesModule
  ],
  entryComponents: [TaskAddComponent],
  exports: [TaskComponent]
})
export class TaskModule { }
