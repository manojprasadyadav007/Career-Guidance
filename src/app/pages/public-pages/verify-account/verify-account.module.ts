import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyAccountComponent } from './verify-account.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [VerifyAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:VerifyAccountComponent}
    ])
  ]
})
export class VerifyAccountModule { }
