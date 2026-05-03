import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocumentComponent } from './add-document/add-document.component';
import { ShowDocumentComponent } from './show-document/show-document.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDialogModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { SentenceCasePipe } from '../../custom-pipes/sentence-case/sentence-case.pipe';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxDataGridModule } from 'devextreme-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ComponentsModule } from 'app/components/components.module';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [AddDocumentComponent, ShowDocumentComponent],
  imports: [
    CommonModule,
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, RemoveSpacesModule,
    SentenceCaseModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    ComponentsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: ShowDocumentComponent },
      { path: 'show', component: ShowDocumentComponent, canActivate: [RoleAuthGuard], data: { allowedRoleType: [RoleType.MSMTeam] } },
    ]),
    DxDataGridModule
  ],
  entryComponents: [AddDocumentComponent]
})
export class AgentDocumentModule { }
