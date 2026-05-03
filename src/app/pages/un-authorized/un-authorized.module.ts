import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnAuthorizedComponent } from './un-authorized.component';
import { RouterModule } from '@angular/router';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [UnAuthorizedComponent],
  imports: [
    CommonModule, SentenceCaseModule,
    RouterModule.forChild([
      { path: '', component: UnAuthorizedComponent }
    ])
  ]
})
export class UnAuthorizedModule { }
