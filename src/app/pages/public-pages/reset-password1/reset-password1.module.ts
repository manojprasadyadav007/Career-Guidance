import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPassword1Component } from './reset-password1.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmPasswordModule } from 'app/directive/custom-validator/confirm-password/confirm-password.module';



@NgModule({
  declarations: [ResetPassword1Component],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:ResetPassword1Component}
    ]),
    FormsModule,
    ConfirmPasswordModule
  ]
})
export class ResetPassword1Module { }
