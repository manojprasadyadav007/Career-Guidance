import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ShowUserComponent } from './show-user/show-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'app/components/components.module';
import { UserInstitutionsComponent } from './user-institutions/user-institutions.component';
import { AddUserInstitutionsComponent } from './user-institutions/add-user-institutions/add-user-institutions.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { TermsAndConditionModule } from '../terms-and-condition/terms-and-condition.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxoExportModule, DxiColumnModule } from 'devextreme-angular/ui/nested';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { ConfirmBoxModule } from 'app/utility/confirm-box/confirm-box.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
@NgModule({
  declarations: [ShowUserComponent, AddUserComponent, UserInstitutionsComponent, AddUserInstitutionsComponent, UserPermissionComponent,],
  entryComponents: [AddUserInstitutionsComponent],
  imports: [
    UsersRoutingModule,
    SentenceCaseModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ConfirmBoxModule,
    MatTabsModule,
    TermsAndConditionModule,
    DxDataGridModule,
    DxoExportModule,
    DxiColumnModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    MatTooltipModule

  ],
})
export class UsersModule { }
