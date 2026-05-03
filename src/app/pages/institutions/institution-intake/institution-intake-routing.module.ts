import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { InstitutionIntakeComponent } from './institution-intake.component';
import { InstitutionIntakeModule } from './institution-intake.module';

@NgModule({
  imports: [
    InstitutionIntakeModule,
    RouterModule.forChild([
      { path: '', component: InstitutionIntakeComponent  },
    ])],
})
export class InstitutionIntakeRoutingModule { }
