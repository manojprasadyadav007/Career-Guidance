import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckEligibilityComponent } from './check-eligibility/check-eligibility.component';

const routes: Routes = [
  { path: '', component: CheckEligibilityComponent },
  { path: 'check', component: CheckEligibilityComponent },
  { path: 'check/:programid/:institutionid', component: CheckEligibilityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EligibilityRoutingModule { }
