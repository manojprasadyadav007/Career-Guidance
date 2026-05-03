import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { InstitutionTeamComponent } from './institution-team.component';
import { InstitutionTeamModule } from './institution-team.module';

@NgModule({
  imports: [
    InstitutionTeamModule,
    RouterModule.forChild([
      { path: '', component: InstitutionTeamComponent  },
    ])],
})
export class InstitutionTeamRoutingModule { }
