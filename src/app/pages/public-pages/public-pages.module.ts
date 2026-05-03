import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionPageComponent } from './institution-page/institution-page.component';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { EmbedVideo } from 'ngx-embed-video';
import { Signin2Component } from './signin2/signin2.component';
import { SearchProgramPublicComponent } from './search-program-public/search-program-public.component';
import { SelectNationalityDialogComponent } from './select-nationality-dialog/select-nationality-dialog.component';
import { ForgoatPassword1Component } from './forgoat-password1/forgoat-password1.component';
import { ResetPassword1Component } from './reset-password1/reset-password1.component';
import { RecaptchaProviderModule } from 'app/utility/recaptcha-provider.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    SentenceCaseModule,
    RouterModule,
    EmbedVideo.forRoot(),
    MatAutocompleteModule,
    MatDialogModule,
    MatListModule,
    MatOptionModule,
    RecaptchaProviderModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule
  ],
  entryComponents: [],
})
export class PublicPagesModule { }
