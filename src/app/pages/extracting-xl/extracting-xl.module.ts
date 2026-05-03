import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractingXlComponent } from './extracting-xl.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FileUploadModule } from 'app/components/file-upload/fiile-upload.module';
import { FormsModule } from '@angular/forms';

import { ExtractedXlShowComponent } from './extracted-xl-show/extracted-xl-show.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { XlBatchdataDialogComponent } from './xl-batchdata-dialog/xl-batchdata-dialog.component';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [ExtractingXlComponent, ExtractedXlShowComponent, XlBatchdataDialogComponent, ImportExcelComponent,],
  imports: [
    CommonModule, MatButtonModule, SentenceCaseModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ExtractedXlShowComponent },
      { path: 'add', component: ImportExcelComponent, canActivate: [RoleAuthGuard], data: { allowedRoleType: [RoleType.MSMTeam] } },
    ]),

    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,

    DxDataGridModule,

    FileUploadModule,
    TrackByPropertyModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [XlBatchdataDialogComponent],
})
export class ExtractingXlModule { }
