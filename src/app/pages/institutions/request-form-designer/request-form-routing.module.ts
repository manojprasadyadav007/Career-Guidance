import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { Role } from 'app/models/site-map.model';
import { RequestFormDesignerComponent } from './request-form-designer.component';
import { RequestFormDesignerModule } from './request-form.module';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: RequestFormDesignerComponent,canActivate:[RoleAuthGuard],data:{allowedRole:[Role.Admin]}},
  ]),
  RequestFormDesignerModule
],
  exports: [RouterModule]
})
export class RequestFormRoutingModule { }
