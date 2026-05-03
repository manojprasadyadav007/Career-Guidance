import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
      RecaptchaModule,
      RecaptchaFormsModule
    ],
    providers: [
      { provide: RECAPTCHA_SETTINGS,
        useValue: {
          siteKey: '6Lcz66sZAAAAADLnKSoMbFhj2aKCg353nGfxXdcn',
        } as RecaptchaSettings,
      }
    ],
    exports:[RecaptchaModule,RecaptchaFormsModule]
  })
  export class RecaptchaProviderModule { }