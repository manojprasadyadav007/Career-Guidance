import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    SentenceCaseModule,
    RouterModule.forChild([
      { path: '', component: ChangePasswordComponent }
    ])
  ]
})
export class ChangePasswordModule { }
