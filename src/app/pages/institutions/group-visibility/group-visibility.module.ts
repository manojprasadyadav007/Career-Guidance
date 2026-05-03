import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupVisibilityComponent } from './group-visibility.component';
import { MatButtonModule } from '@angular/material/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [GroupVisibilityComponent,],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    DxDataGridModule,
    SentenceCaseModule
  ],
  exports: [GroupVisibilityComponent]
})
export class GroupVisibilityModule { }
