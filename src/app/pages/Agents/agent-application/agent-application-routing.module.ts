import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentApplicationModule } from './agent-application.module';
import { RouterModule } from '@angular/router';
import { ShowAgentApplicationComponent } from './show-agent-application/show-agent-application.component';
import { AddAgentApplicationComponent } from './add-agent-application/add-agent-application.component';
import { GeneratePdfComponent } from './generate-pdf/generate-pdf.component';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { Role, RoleType } from 'app/models/site-map.model';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgentApplicationModule,
    RouterModule.forChild(
      [
        { path: '', component: ShowAgentApplicationComponent },
        { path: 'add-application/:instid', component: AddAgentApplicationComponent, canActivate: [RoleAuthGuard],data:{disallowedRole:[Role.Student,Role.Institute]} },
        { path: 'add-application/:instid/:agentid', component: AddAgentApplicationComponent, canActivate: [RoleAuthGuard],data:{disallowedRole:[Role.Student,Role.Institute]} },
        { path: 'add-application', component: AddAgentApplicationComponent, canActivate: [RoleAuthGuard],data:{disallowedRole:[Role.Student,Role.Institute]} },
        { path: 'edit-application/:id', component: AddAgentApplicationComponent,canActivate:[RoleAuthGuard],data:{disallowedRole:[Role.Student]}},
        // { path: 'generate-pdf/:id', component: GeneratePdfComponent,canActivate:[RoleAuthGuard],data:{disallowedRole:[Role.Student]}},
      ]
    )
  ]
})
export class AgentApplicationRoutingModule { }
