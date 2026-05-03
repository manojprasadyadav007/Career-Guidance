import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import { AddAgentsComponent } from './add-agents.component';
import { AddAgentModule } from './add-agents.module';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: AddAgentsComponent,canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
  ]),
  AddAgentModule
],
  exports: [RouterModule]
})
export class AddAgentRoutingModule { }
