import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Login } from 'app/models/login.model';
import { sitemap, AppDefaultValue } from 'app/models/site-map.model';
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router'
import {MenuService } from 'app/services/menu.service'
import { EncryptionService } from './encryption.service';
 
@Injectable({
  providedIn:  'root'
})
export class AuthenticationService {

  APIURL: string = environment.apiurl + "Authentication/";
  private user: Login = AppDefaultValue.User;

  socialUser: SocialUser;

  currentUserSubject: BehaviorSubject<Login> = new BehaviorSubject<Login>(this.user);

  ipaddress: string = '0.0.0.0';

  // constructor(private http: HttpClient, private socialService: AuthService) {
  //   // this.authenticate();
  //   this.setIpArress();

  //   if (localStorage.getItem(AppDefaultValue.tokenPath)) {
  //     this.refreshToken();
  //   }
  // }

  constructor(private http: HttpClient,
    private router: Router , private menuService : MenuService,
    private encryptionService: EncryptionService) {
    // this.authenticate();
    this.setIpArress();

    if (localStorage.getItem(AppDefaultValue.tokenPath)) {
      this.refreshToken();
    }
  }


  getIPAddress() {
    return this.http.get<any>("https://api.ipify.org/?format=json", {});
  }

  setIpArress() {
    if (this.ipaddress === null) {
      this.getIPAddress().subscribe(res => {
        this.ipaddress = res.ip;
      });
    }
  }



  refreshToken() {

    this.setIpArress();

    this.http.post<any>(this.APIURL + "RefreshToken", { ip: this.ipaddress }).subscribe(res => {
      this.setLogin(res);
    });
  }

  login(form: any, isOnlyStudentLogin: boolean, ipRequired: boolean) {
    let finalData = Object.assign({},form);
    this.setIpArress();
    finalData.ip = this.ipaddress;

    finalData.Password = this.encryptionService.set(environment.encryptp, finalData.Password);

    if (!ipRequired && !finalData.ip) {
      finalData.ip = '';
    }
    return this.http.post<any>(this.APIURL + "Login", finalData).pipe(map(res => {
      if (isOnlyStudentLogin && res.rslt.RoleId != 3) {
        return res.rslt;
      }
      this.setLogin(res);
      return res;
    }, err => {
      this.logout();
    }));
  }

  getGhostLogin(userId:number){
    return this.http.post<any>(this.APIURL + "GhostLogin?GhostUserId="+userId,{}).pipe(map(res => {
      if (!res.error){
        res.rslt.GhostLogin = localStorage.getItem(AppDefaultValue.tokenPath);
        this.setLogin(res);     
      } 
      return res; 
    }));

  }

  loginWithSocialAccount(form: any, isOnlyStudentLogin: boolean) {
    form.ip = this.ipaddress;
    return this.http.post<any>(this.APIURL + "LoginWithSocialAccount", form).pipe(map(res => {
      if (isOnlyStudentLogin && res.rslt.RoleId != 3) {
        return res.rslt;
      }
      this.setLogin(res);
      return res;
    }, err => {
      this.logout();
    }));
  }

  setLogin(res) {
    if (!res.error) {
      if (res.rslt.ProviderId && res.rslt.ProviderId != '') {
        if (this.socialUser && this.socialUser.provider === res.rslt.ProviderName && this.socialUser.id === res.rslt.ProviderId) {
         this.setToken(res);
        }
      }
      else {
       this.setToken(res);
      }
    }
    else {
      this.logout();
    }
  }

  setToken(res)
  {
    res.rslt.GenerateOn = new Date();
    localStorage.setItem(AppDefaultValue.tokenPath, res.token);
    //sessionStorage.setItem(AppDefaultValue.tokenPath, res.token);
    this.menuService.setMenu(res.menu);
    let ghostUser = this.currentUserSubject.getValue().GhostLogin;
    if(ghostUser){
      this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
            this.router.navigate(['/member/dashboard']);
      });
    }
    //localStorage.setItem(AppDefaultValue.menuPath, JSON.stringify(res.menu));
    this.currentUserSubject.next(res.rslt);
  }

  logout(sessionExpired?: boolean) {
    // remove user from local storage to log user out
    // try {
    //   this.socialService.signOut(true);
    // }
    // catch (e) {

    // }

    localStorage.removeItem(AppDefaultValue.tokenPath);
   // sessionStorage.removeItem(AppDefaultValue.tokenPath);
    let localUser = this.currentUserSubject.getValue().UserId;
    this.user = AppDefaultValue.User;
    this.currentUserSubject.next(this.user);
    if (localUser > 0 && sessionExpired) {
      this.router.navigate(['/signin'], { queryParams: { message: 'Session expired', returnUrl: this.router.url } });
      return;
    }
  }



  checkPermission(siteMap: sitemap) {
    if (this.currentUserSubject.value.RoleId === 1) {
      return 4;
    }
    var rslt = this.currentUserSubject.value.Permission.find(d => d.EntityId === siteMap)
    if (rslt) {
      return rslt.Permission;
    }
    return 0;
  }

  setSocialLogin(user: SocialUser) {
    this.socialUser = user;
  }

  assignedInstitutionIds() {
    return this.http.get<any[]>(this.APIURL + "AssignedInstitutionIds");
  }

}
