import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountStatusGuard } from 'app/guards/accountstatus.guard';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import {Role} from 'app/models/site-map.model'

const routes: Routes = [
  { path: '',  loadChildren: () => import('app/pages/institutions/show-institutions/show-instittutions.module').then(m => m.ShowInstitutionsModule)},
  { path: 'form',loadChildren: () => import('app/pages/institutions/request-form-designer/request-form-routing.module').then(m => m.RequestFormRoutingModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Admin]}},
  { path: 'add-institutions', loadChildren: () => import('app/pages/institutions/add-institutions/add-institutions.module').then(m => m.AddInstitutionsModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
  { path: 'institution-profile', loadChildren: () => import('app/pages/institutions/add-institutions/add-institutions.module').then(m => m.AddInstitutionsModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
  { path: 'edit-institutions', loadChildren: () => import('app/pages/institutions/add-institutions/add-institutions.module').then(m => m.AddInstitutionsModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
  {path:'programs',  loadChildren: () => import('app/pages/program/program.module').then(m => m.ProgramModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam,RoleType.Institute]}},
   // Institution login routes
   
   { path: 'campus', loadChildren: () => import('app/pages/institutions/campus/campus-routing.module').then(m => m.CampusRoutingModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
   { path: 'region-of-marketing', loadChildren: () => import('app/pages/institutions/country/country-routing.module').then(m => m.CountryRoutingModule) ,canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
   { path: 'disciplines', loadChildren: () => import('app/pages/institutions/InstDescpline/desciplines-routing.module').then(m => m.DesciplinesRoutingModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
   { path: 'intake', loadChildren: () => import('app/pages/institutions/institution-intake/institution-intake-routing.module').then(m => m.InstitutionIntakeRoutingModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
   { path: 'marketing-collateral', loadChildren: () => import('app/pages/institutions/instituteion-material/institution-material-routing.module').then(m => m.InstitutionMaterialRoutingModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
   { path: 'events-update', loadChildren: () => import('app/pages/event/event-routing.module ').then(m => m.EventRoutingModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
   { path: 'application-flow', loadChildren: () => import('app/pages/institutions/application-flow/application-flow-routing.module').then(m => m.ApplicationFlowRoutingModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
   { path: 'team', loadChildren: () => import('app/pages/institutions/institution-team/institution-team-routing.module').then(m => m.InstitutionTeamRoutingModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
   { path: 'agent', loadChildren: () => import('app/pages/institutions/institution-agents/institution-agents-routing.module').then(m => m.InstitutionAgentsRoutingModule),canActivate:[RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Institute]}},
   { path: 'bulkupdate', loadChildren: () => import('app/pages/institutions/institution-program-status-update/institution-program-status-route').then(m => m.InstitutionProgramUpdateRoutingModule), data:{allowedRoleType:[RoleType.MSMTeam,RoleType.Institute]}},
   { path: 'stappform', loadChildren: () => import('app/pages/institutions/upload-student-app-layout/upload-student-app-layout.module').then(m => m.UploadStudentAppLayoutModule), data:{allowedRole:[Role.Admin]}},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionsRoutingModule { }
