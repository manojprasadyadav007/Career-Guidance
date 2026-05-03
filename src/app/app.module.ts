import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MAT_DIALOG_DATA, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.Interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';

import { CommonModule } from '@angular/common';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { Title } from '@angular/platform-browser';

import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../environments/environment';
import { PreviousRouteService } from 'app/services/previousPath.service';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { environment } from '../environments/environment';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.socialGoogleId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.socialFacebookId)
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  imports: [
    BrowserAnimationsModule,
    SocialLoginModule,
    //FormsModule,
    //HttpModule,
    //SocialLoginModule,

    AppRoutingModule,
    //ComponentsModule,
    CommonModule,

    HttpClientModule,
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    MsalModule.forRoot({
      auth: {
        clientId: OAuthSettings.appId
      }
    })
    //NgxExtendedPdfViewerModule,
    //  MatDatepickerModule,
    //  MatMomentDateModule,
    //  MatDialogModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ToasterService,
    Title,
    PreviousRouteService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: provideSocialServiceConfig
    // },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { width: '80%', minWidth: '400px', hasBackdrop: true, disableClose: true, backdropClass: 'backdropBackground', closeOnNavigation: true } },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
