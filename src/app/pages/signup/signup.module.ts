import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AgentComponent } from './agent/agent.component';
import { ComponentsModule } from 'app/components/components.module';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { SocialComponent } from './social/social.component';
import { Agent1Component } from './agent1/agent1.component';
import { RecaptchaProviderModule } from 'app/utility/recaptcha-provider.module';
import { Student2Component } from './student2/student2.component';
import { MatRadioModule } from '@angular/material/radio';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { SpinnerModule } from 'app/utility/spinner/spinner.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [SignupComponent, SocialComponent, Agent1Component, Student2Component],
  imports: [
    CommonModule,
    ComponentsModule,
    SentenceCaseModule,
    SignupRoutingModule,
    //SocialLoginModule,
    MatRadioModule,
    RecaptchaProviderModule,
    MatOptionModule,
    ComponentsModule,
    SignupRoutingModule,
    //SocialLoginModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    SpinnerModule
  ],
  // providers: [
  //   {
  //     provide: AuthServiceConfig,
  //     useFactory: provideSocialServiceConfig
  //   },
  // ],
})
export class SignupModule { }
