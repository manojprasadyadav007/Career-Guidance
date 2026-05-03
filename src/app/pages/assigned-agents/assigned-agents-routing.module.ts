import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignedAgentComponent } from './assigned-agent/assigned-agent.component';


const routes: Routes = [
  { path: '', component: AssignedAgentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedAgentsRoutingModule { }
