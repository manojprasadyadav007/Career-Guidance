import { Routes } from "@angular/router";
import { ShowEvaluationFormComponent } from "./show-evaluation-form/show-evaluation-form.component";
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import {Role} from 'app/models/site-map.model'


export const EvaluationForm :Routes = [
     { path: '', component:   ShowEvaluationFormComponent },
     { path: 'application-for-institution', loadChildren: () => import('app/pages/Agents/agent-application/agent-application-routing.module').then(m => m.AgentApplicationRoutingModule),canActivate:[RoleAuthGuard],data:{disallowedRole:[Role.Student]}}];