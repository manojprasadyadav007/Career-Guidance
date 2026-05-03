import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { ShowRoleComponent } from './role/show-role/show-role.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module';
import { MatMenuModule } from '@angular/material/menu';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { Role } from 'app/models/site-map.model';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';
@NgModule({
  declarations: [RolePermissionComponent, ShowRoleComponent, AddRoleComponent,],
  imports: [
    CommonModule,
    ComponentsModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, RemoveSpacesModule,
    MatMenuModule,
    SentenceCaseModule,
    DxPopupModule,
    RouterModule.forChild([
      { path: '', component: ShowRoleComponent },
      { path: 'show', component: ShowRoleComponent, canActivate: [RoleAuthGuard], data: { allowedRole: [Role.Admin] } },
      { path: 'permission', component: RolePermissionComponent, canActivate: [RoleAuthGuard], data: { allowedRole: [Role.Admin] } },
      { path: 'permission/:id', component: RolePermissionComponent, canActivate: [RoleAuthGuard], data: { allowedRole: [Role.Admin] } },
    ]),
    DxDataGridModule
  ],
  entryComponents: [AddRoleComponent]
})
export class AppPermissionModule { }

