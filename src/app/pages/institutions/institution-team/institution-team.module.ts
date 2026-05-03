import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionTeamComponent } from './institution-team.component';
import { MatButtonModule } from '@angular/material/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatIconModule } from '@angular/material/icon';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [InstitutionTeamComponent,],
  imports: [
    CommonModule,
    MatButtonModule,
    SentenceCaseModule,
    MatIconModule,
    DxDataGridModule
  ],
  exports: [InstitutionTeamComponent]
})
export class InstitutionTeamModule { }
