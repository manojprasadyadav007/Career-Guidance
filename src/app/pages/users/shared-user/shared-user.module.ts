import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUserComponent } from '../shared-user/shared-user.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
@NgModule({
  declarations: [SharedUserComponent,],
  imports: [
    CommonModule,
    MatTooltipModule,
    DxDataGridModule,
    MatIconModule,
    MatButtonModule,
    SentenceCaseModule,
  ],
  exports: [SharedUserComponent]
})
export class SharedUserModule { }
