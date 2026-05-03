import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

import { Login } from 'app/models/login.model';
import { appPattern } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { UserService } from 'app/services/user.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { environment } from '../../../../environments/environment';
import { EncryptionService } from 'app/services/encryption.service';
import { OAuthService } from 'app/services/oauth.service';
import { linkedInCredentials } from '../../../../environments/environment'
@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.scss']
})
export class Signin2Component implements OnInit, OnDestroy {


  linkedInToken;
  formdata: any;
  returnUrl: string = "/member/dashboard";
  loginerror: string;
  currentUser: Login;
  expiredMessage;
  remember: boolean;
  showcaptcha = environment.hideCaptcha;
  modelPattern = appPattern;
  showLoader = false;
  return_new_url:any;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private socialAuthService: AuthService,
    private userService: UserService,
    private encryptionService: EncryptionService,
    private microsoftOAuth: OAuthService
  ) {
    if (this.route.snapshot.queryParams["code"]) {
      this.showLoader = true;
      this.linkedInToken = this.route.snapshot.queryParams["code"];
      this.userService.linkedInAuth(this.linkedInToken).subscribe((res) => {
        let linkedin = JSON.parse(res.email).elements[0]["handle~"]["emailAddress"];
        const finalJson = { firstName: res.firstName, lastName: res.lastName, id: res.id, email: linkedin }
        this.checkSocialSignup('LINKEDIN', finalJson);
      });
    }
    this.return_new_url=this.route.snapshot.queryParams['returnUrl'];
   
  }

  ngOnInit() {
    this.authService.setIpArress();


    this.formdata = { UserName: '', Password: '', LoginType: '0' }
    let usedetails = localStorage.getItem('S1');
    if (usedetails) {
      let userparse = JSON.parse(usedetails);
      this.formdata.UserName = this.encryptionService.get(environment.currentUD, userparse.A1);
      this.formdata.Password = this.encryptionService.get(environment.currentUD, userparse.A2);
      this.remember = userparse.A3
    }
    if(this.return_new_url!=undefined)
    {
      this.returnUrl = this.return_new_url;
    }
    this.expiredMessage = this.route.snapshot.queryParams['message'];
    this.authService.currentUserSubject.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (v) => {
        this.currentUser = v;
        if (this.currentUser.UserId > 0) {
          this.ngZone.run(() => this.router.navigateByUrl(this.returnUrl));
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    this.authService.setIpArress();
    this.loginerror = null;
    this.expiredMessage = null;
    if (form.invalid) {
      return;
    }
    //  this.formdata.Password = this.encryptionService.set(environment.encryptp, this.formdata.Password);
    this.authService.login(this.formdata, false, true).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res.error) {
        this.loginerror = res.error;
      }
      else {
        // this.router.navigateByUrl(this.returnUrl);
        //  localStorage.setItem('currentUD', JSON.stringify(this.formdata));
        if (this.remember) {
          const encryptedUser = this.encryptionService.set(environment.currentUD, this.formdata.UserName);
          const encryptedPass = this.encryptionService.set(environment.currentUD, this.formdata.Password);
          localStorage.setItem('S1', JSON.stringify({ A1: encryptedUser, A2: encryptedPass, A3: this.remember }));
        }


      }
    },
      err => {
        if (err.status === 404) {
          this.loginerror = "Invalid username or password";
        }
        else {
          this.loginerror = 'Error in login';
        }
      }
    );
  }

  checkValue() {
    this.remember === true ? '' : localStorage.removeItem('S1');
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      this.checkSocialSignup(GoogleLoginProvider.PROVIDER_ID, res);
    });


  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
      this.checkSocialSignup(FacebookLoginProvider.PROVIDER_ID, res);
    });
  }

  signInWithLinkedIn(): void {

    window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${linkedInCredentials.clientId
      }&redirect_uri=${linkedInCredentials.redirectUrl}&state=987654321&scope=r_liteprofile%20r_emailaddress%20w_member_social`;

  }

  async signInWithMicrosoft(): Promise<void> {
    await this.microsoftOAuth.microsoftSignIn().then((res) => {
      if(res) {
        this.checkSocialSignup('MICROSOFT', res);
      }
    });
  }

  signInWithTwitter(): void {
    this.router.navigate(['signup/agent'], { queryParams: { provider: 'twitter' } });
  }

  signInWithSocial(provider: string, res: any) {
    this.authService.setSocialLogin(res);
    this.authService.loginWithSocialAccount(
      { ProviderName: provider, ProviderId: res.id, LoginType: 0 }, false).pipe(takeUntil(this.onDestroy$))
      .subscribe(logr => {
        if (logr.error) {
          this.loginerror = logr.error;
        }
      },
        err => {
          if (err.status === 404) {
            this.loginerror = "Invalid username or password";
          }
          else {
            this.loginerror = 'Error in login';
          }
        });
  }


  checkSocialSignup(providername: string, user: any) {
    this.showLoader = true;
    this.userService.checkSocialSignup(providername, user.id).pipe(takeUntil(this.onDestroy$))
      .subscribe(res => {
        this.showLoader = false;
        if (!res || res.length === 0) {
          this.authService.setSocialLogin(user);
          this.router.navigate(['signup/agent'], {
            queryParams: {
              provider: providername, firstName: user.firstName,
              lastName: user.lastName, providerId: user.id, email: user.email
            }
          });
        }
        else {
          this.signInWithSocial(providername, user);
        }
      });
  }



}
