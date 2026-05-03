import { Routes } from "@angular/router";
//import { AddAgentsComponent } from "./add-agents/add-agents.component";
//import { ShowAgentsComponent } from "./show-agents/show-agents.component";
import { ShowAgentApplicationComponent } from "./agent-application/show-agent-application/show-agent-application.component";
import { RoleAuthGuard } from "app/guards/role-auth.guard";
import { RoleType } from 'app/models/site-map.model';
import {Role} from 'app/models/site-map.model'


export const AgentRoutes:Routes = [
    { path: '', loadChildren:()=> import('./show-agents/show-agent.module').then(m=>m.ShowAgentModule),canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
//    { path: 'show-agents', loadChildren:()=> import('./show-agents/show-agent.module').then(m=>m.ShowAgentModule),canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
    { path: 'add-agent', loadChildren:()=> import('./add-agents/add-agent-routing.module').then(m=>m.AddAgentRoutingModule),canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
    { path: 'edit-agent/:id', loadChildren:()=> import('./add-agents/add-agent-routing.module').then(m=>m.AddAgentRoutingModule),canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
    { path: 'commission', loadChildren:()=> import('./commission/commission.module').then(m=>m.CommissionModule),canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
    { path: 'evaluationform/application-for-institution/:id',loadChildren:()=> import('./agent-application/agent-application-routing.module').then(m=>m.AgentApplicationRoutingModule),canActivate:[RoleAuthGuard],data:{disallowedRole:[Role.Student]}},
    
];