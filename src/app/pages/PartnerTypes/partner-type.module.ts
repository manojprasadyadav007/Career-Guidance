import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'app/components/components.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { DxPopupModule, DxDataGridModule } from 'devextreme-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ShowPartnerTypesComponent } from './show-partner-types/show-partner-types.component';
import { AddPartnerTypeComponent } from './add-partner-type/add-partner-type.component';
import { FormsModule } from '@angular/forms';
import { RoleType } from 'app/models/site-map.model';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [ShowPartnerTypesComponent, AddPartnerTypeComponent,],
  imports: [
    CommonModule, SentenceCaseModule,
    NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, RemoveSpacesModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: ShowPartnerTypesComponent },
      { path: 'show', component: ShowPartnerTypesComponent, canActivate: [RoleAuthGuard], data: { allowedRoleType: [RoleType.MSMTeam] } },
    ]),
    DxDataGridModule
  ],
  entryComponents: [AddPartnerTypeComponent]
})
export class PartnerTypeModule { }
