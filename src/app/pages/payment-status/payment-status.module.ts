import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentStatusComponent } from './payment-status.component';
import { RouterModule } from '@angular/router';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [PaymentStatusComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    RouterModule.forChild([
      { path: '', component: PaymentStatusComponent }
    ])
  ]
})
export class PaymentStatusModule { }
