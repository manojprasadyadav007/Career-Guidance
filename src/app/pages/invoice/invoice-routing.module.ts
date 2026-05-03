import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { MapInvoiceCommissionComponent } from './map-invoice-commission/map-invoice-commission.component';
import { DisplayInvoiceComponent } from './display-invoice/display-invoice.component';
import { Role, RoleType } from 'app/models/site-map.model';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';

const routes: Routes = [
  { path: '', component: ViewInvoiceComponent },
  { path: 'generate-invoice', component: GenerateInvoiceComponent,canActivate:[RoleAuthGuard],data:{allowedRole:[Role.Agent]}},
  { path: 'view/:id', component: DisplayInvoiceComponent,canActivate:[RoleAuthGuard],data:{disallowedRole:[Role.Student]}},
  { path: 'map-commission', component: MapInvoiceCommissionComponent,canActivate:[RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
