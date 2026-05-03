import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import { InstitutionProgramStatusUpdateComponent } from './institution-program-status-update.component';
import { InstitutionProgramStatusUpdateModule } from './institution-program-status-update.module';

const routes: Routes = [
  { path: ':id', component:  InstitutionProgramStatusUpdateComponent,canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam,RoleType.Institute]}},
  { path: '', component:  InstitutionProgramStatusUpdateComponent},
]
@NgModule({
  imports: [InstitutionProgramStatusUpdateModule,RouterModule.forChild(routes)],
})
export class InstitutionProgramUpdateRoutingModule { }
