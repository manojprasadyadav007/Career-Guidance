import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationFlowComponent } from './application-flow.component';
import { ApplicationFlowModule } from './application-flow.module';

@NgModule({
  imports: [
    ApplicationFlowModule,
    RouterModule.forChild([
      { path: '', component: ApplicationFlowComponent}
    ])],
})
export class ApplicationFlowRoutingModule { }
