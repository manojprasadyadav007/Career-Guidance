import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
import { ComponentsModule } from 'app/components/components.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatButtonModule } from '@angular/material/button';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DisplayFilesLocalComponent } from './display-files-local/display-files-local.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { DisplayFilesComponent } from './display-files/display-files.component';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [DocumentsComponent, DisplayFilesLocalComponent, DisplayFilesComponent, UploadFilesComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    DxDataGridModule,
    MatIconModule,
    MatButtonModule,
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, RemoveSpacesModule
  ],
  exports: [DocumentsComponent, DisplayFilesLocalComponent, DisplayFilesComponent],

  entryComponents: [UploadFilesComponent]
})
export class DocumentsModule { }
