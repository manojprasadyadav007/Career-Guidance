import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signin2Component } from './signin2.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecaptchaProviderModule } from 'app/utility/recaptcha-provider.module';
import { SpinnerModule } from 'app/utility/spinner/spinner.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [Signin2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [{path:'',component:Signin2Component}]
    ),
    FormsModule,
    RecaptchaProviderModule,
    SpinnerModule,
    MatProgressSpinnerModule
  ]
})
export class Signin2Module { }
