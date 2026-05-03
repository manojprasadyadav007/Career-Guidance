import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunitiesComponent } from './opportunities.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [OpportunitiesComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: OpportunitiesComponent },
    ]),
    DxDataGridModule
  ]
})
export class OpportunitiesModule { }
