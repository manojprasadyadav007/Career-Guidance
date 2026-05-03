import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KpiComparisonDashboardComponent } from './kpi-comparison-dashboard.component';
import { KpiDashboardComponent } from './kpi-dashboard/kpi-dashboard.component';
import { RoleAuthGuard } from "app/guards/role-auth.guard";
import { RoleType } from 'app/models/site-map.model';
import {Role} from 'app/models/site-map.model'

const routes: Routes = [
  {
    path: 'comparison-dashboard', component: KpiComparisonDashboardComponent,canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
  {
    path: 'dashboard', component: KpiDashboardComponent,canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KpiComparisonDashboardRoutingModule { }
