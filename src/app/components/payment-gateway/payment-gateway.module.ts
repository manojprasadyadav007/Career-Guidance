import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentGatewayComponent } from './payment-gateway.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes =[{
      path: '',
      component: PaymentGatewayComponent
  }];

@NgModule({
  declarations: [PaymentGatewayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [PaymentGatewayComponent]
})
export class PaymentGatewayModule { }
