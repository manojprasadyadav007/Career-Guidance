import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTasksComponent } from './user-tasks.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { RouterModule } from '@angular/router';
import { TaskModule } from 'app/pages/task/task.module';
import { TaskAddComponent } from '../task/task-add/task-add.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [UserTasksComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    DxDataGridModule,
    MatIconModule,
    MatDialogModule,
    TaskModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: UserTasksComponent }
    ]),


  ],
  entryComponents: [TaskAddComponent],
})
export class UserTasksModule { }
