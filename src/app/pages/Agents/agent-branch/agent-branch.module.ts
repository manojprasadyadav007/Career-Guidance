import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ShowBranchComponent } from './show-branch/show-branch.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDialogModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'app/components/components.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxDataGridModule } from 'devextreme-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [AddBranchComponent, ShowBranchComponent],
  imports: [
    CommonModule,
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, RemoveSpacesModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    ComponentsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    DxDataGridModule,
    SentenceCaseModule
  ],
  exports: [ShowBranchComponent],
  entryComponents: [AddBranchComponent]

})
export class AgentBranchModule { }
