import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddApplicationComponent } from './add-application.component';
import { StudentCreateLayoutModule } from 'app/pages/students/student-create-layout/student-create-layout.module';
import { RouterModule } from '@angular/router';
import { SearchStudentModule } from 'app/pages/search-student/search-student.module';



@NgModule({
  declarations: [AddApplicationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AddApplicationComponent },
      { path: ':studentid/:email', component: AddApplicationComponent },
      { path: ':studentid', component: AddApplicationComponent },
      { path: ':id/:studentid/:programid/:institutionid', component: AddApplicationComponent },
    ]),

    StudentCreateLayoutModule,
    SearchStudentModule 
  ]
})
export class AddApplicationModule { }
