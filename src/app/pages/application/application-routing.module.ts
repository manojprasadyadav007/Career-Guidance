import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowApplicationDetailedComponent } from './show-application-detailed/show-application-detailed.component';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import {Role} from 'app/models/site-map.model'

const routes: Routes = [ 
  { path: '', component: ShowApplicationDetailedComponent },
  { path: 'new', loadChildren:()=> import('./add-application/add-application.module').then(m=>m.AddApplicationModule),canActivate:[RoleAuthGuard],data:{disallowedRole:[Role.Institute]}},
  { path: 'apply',loadChildren:()=> import('./add-application/add-application.module').then(m=>m.AddApplicationModule),canActivate:[RoleAuthGuard],data:{disallowedRole:[Role.Institute]}},
  { path: 'view', loadChildren:()=> import('./display-application/display-application.module').then(m=>m.DisplayApplicationModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
