import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowKnowlegeCentreComponent } from './show-knowlege-centre/show-knowlege-centre.component';
import { AddKnowledgeCentreComponent } from './add-knowledge-centre/add-knowledge-centre.component';


const routes: Routes = [
  { path: '', component: ShowKnowlegeCentreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeCentreRoutingModule { }
