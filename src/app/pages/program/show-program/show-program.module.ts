import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProgramComponent } from './show-program.component';
import { MatIconModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { ConfirmBoxModule } from 'app/utility/confirm-box/confirm-box.module';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [ShowProgramComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    DxDataGridModule,
    MatIconModule,
    MatButtonModule,
    ConfirmBoxModule,
    MatTooltipModule,
    MatMenuModule
  ],
  exports: [ShowProgramComponent],
  entryComponents: [ConfirmBoxComponent]
})
export class ShowProgramModule { }
