import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import { AddStudentsComponent } from './add-students/add-students.component';
import { ShowStudentsDetailedComponent } from './show-students-detailed/show-students-detailed.component';
import {Role} from 'app/models/site-map.model'

const routes: Routes = [
  { path: '', component: ShowStudentsDetailedComponent },
  { path: 'show-students', component: ShowStudentsDetailedComponent,canActivate: [RoleAuthGuard],data:{disallowedRole:[Role.Student,Role.Institute]} },
  { path: 'add-student', component: AddStudentsComponent,canActivate: [RoleAuthGuard],data:{disallowedRole:[Role.Student,Role.Institute]} },
  { path: 'edit-student', loadChildren:()=> import ('./display-student/display-student.module').then(m=>m.DisplayStudentModule),canActivate: [RoleAuthGuard],data:{disallowedRole:[Role.Student,Role.Institute]} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
