import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { Agent1Component } from "./agent1/agent1.component";

const routes: Routes = [
   { path: '', redirectTo:'agent' },
    { path: 'agent', component: Agent1Component },
    // { path: 'student', component: Student2Component },
    // { path: 'social', component: SocialComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SignupRoutingModule { }