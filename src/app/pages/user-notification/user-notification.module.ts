import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNotificationComponent } from './user-notification.component';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [UserNotificationComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    RouterModule.forChild([
      { path: '', component: UserNotificationComponent }
    ]),
    DxDataGridModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UserNotificationModule { }
