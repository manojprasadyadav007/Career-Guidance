import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxPopupModule } from 'devextreme-angular';
import { InstitutionProgramStatusUpdateComponent } from './institution-program-status-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatIconModule } from '@angular/material/icon';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
@NgModule({
  declarations: [InstitutionProgramStatusUpdateComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    DxTooltipModule,
    DxPopupModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    DxDataGridModule,

    //   RouterModule.forChild([
    //     { path: 'bulkupdate/:id', component:  InstitutionProgramStatusUpdateComponent},
    //     //{path:'programbulkUpdate',  loadChildren: () => import('app/pages/institution-program-status-update//institution-program-satus-update.component').then(m => m.ProgramModule),canActivate:[AccountStatusGuard]},
    // ]),

  ],
  exports: [InstitutionProgramStatusUpdateComponent]
})
export class InstitutionProgramStatusUpdateModule { }
