import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InstitutionAgentsComponent } from './institution-agents.component';
import { InstitutionAgentsModule } from './institution-agents.module';

@NgModule({
  imports: [
    InstitutionAgentsModule,
    RouterModule.forChild([
      { path: '', component: InstitutionAgentsComponent },
    ])],
})
export class InstitutionAgentsRoutingModule { }
