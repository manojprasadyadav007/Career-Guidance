import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { InstitutionMaterialAddComponent } from './institution-material-add/institution-material-add.component';
import { InstitutionMaterialShowComponent } from './institution-material-show/institution-material-show.component';
import { FileUploadModule } from 'app/components/file-upload/fiile-upload.module';
import { FormsModule } from '@angular/forms';
import { ShowInstitutionMaterialDialogComponent } from './show-institution-material-dialog/show-institution-material-dialog.component';
import { RemoveSpacesModule } from '../../../directive/remove-spaces/removespaces.module';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { MatMenuModule } from '@angular/material/menu';
import { InstitutionMaterialShowFilesComponent } from './institution-material-show-files/institution-material-show-files.component';
import { DxFileManagerModule } from 'devextreme-angular';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [InstitutionMaterialAddComponent, InstitutionMaterialShowComponent, ShowInstitutionMaterialDialogComponent, InstitutionMaterialShowFilesComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    DxPopupModule,
    MatMenuModule,
    DxDataGridModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule,
    DxFileManagerModule,
    RemoveSpacesModule
  ],
  exports: [InstitutionMaterialShowComponent, InstitutionMaterialShowFilesComponent],
  entryComponents: [InstitutionMaterialAddComponent, ShowInstitutionMaterialDialogComponent]
})
export class InstitutionMaterialModule { }
