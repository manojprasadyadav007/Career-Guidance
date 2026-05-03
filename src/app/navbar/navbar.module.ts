import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { BackButtonModule } from 'app/directive/back-button/back-button.module';
import { FeedbackModule } from 'app/utility/feedback/feedback.module';
import { tooltip } from 'app/navbar/navbar-tooltip.module';
import {MatTooltipModule} from '@angular/material';
import { SpinnerModule } from 'app/utility/spinner/spinner.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    BackButtonModule,
    MatTooltipModule,
    FeedbackModule,tooltip,
    SpinnerModule
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
