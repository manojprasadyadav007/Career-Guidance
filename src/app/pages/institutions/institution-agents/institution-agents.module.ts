import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionAgentsComponent } from './institution-agents.component';
import { MatButtonModule } from '@angular/material/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatIconModule } from '@angular/material/icon';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [InstitutionAgentsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SentenceCaseModule,
    DxDataGridModule
  ],
  exports: [InstitutionAgentsComponent]
})
export class InstitutionAgentsModule { }
