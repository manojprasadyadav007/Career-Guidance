import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowProgramComponent } from './show-program/show-program.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import {Role} from 'app/models/site-map.model'


const routes: Routes = [
  { path: '', component: ShowProgramComponent },
  { path: ':institutionid', component: ShowProgramComponent,canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam,RoleType.Institute]}},
  { path: 'add-program/:institutionid/:id', component: AddProgramComponent,canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam,RoleType.Institute]}},
  { path: 'edit-program/:institutionid/:id', component: AddProgramComponent,canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam,RoleType.Institute]}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
