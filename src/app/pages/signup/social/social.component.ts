import { Component, OnDestroy, OnInit } from '@angular/core';
import { appPattern } from 'app/models/site-map.model';
import { StudentService } from 'app/services/student.service';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit,OnDestroy {

  modelPattern=appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  formdata:any = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    DateOfBirth: '',
    MobileNo: '',
    Email: '',
    Language: '',
    Citizenship: 0,
    PassportNo: '',
    Password: '',
    ProviderId:'',
    ProviderName:''
  };

  userData:any={
    Email:'',
  }

  constructor( private studentService: StudentService,
    private toasterService: ToasterService,
    //private socialService:AuthService,
    private authService:AuthenticationService,
    private router:Router) { }

  ngOnInit() {
    if(this.authService.socialUser)
    {
      this.userData = {
        Email: this.authService.socialUser.email,
      }
      this.formdata={
        FirstName: this.authService.socialUser.firstName,
        MiddleName: '',
        LastName: this.authService.socialUser.lastName,
        DateOfBirth: '',
        MobileNo: '',
        Email: this.authService.socialUser.email,
        Language: '',
        Citizenship: 0,
        PassportNo: '',
        Password: '',
        ProviderId:this.authService.socialUser.id,
        ProviderName:this.authService.socialUser.provider
      }
    }
    else{
      this.toasterService.pop('error','something went wrong, try again');
      this.router.navigate(['/signup/student']);
    }
  }


  // signupWithSocial(provider:any,res:any)
  // {
  //   this.authService.setSocialLogin(res);
  //   this.studentService.signupWithSocialAccount({
  //     ProviderName:provider,
  //     ProviderId:res.id,
  //     FirstName:res.firstName,
  //     LastName:res.lastName,
  //     Email:res.email,
  //     MobileNo:''
  //   }).subscribe(resp=>{
  //       this.authService.loginWithSocialAccount({
  //         ProviderName:provider,
  //         ProviderId:res.id,
  //         LoginType:0
  //       },false).subscribe(logr=>{
  //          this.router.navigate(['/member/profile']);
  //       })
  //   });
  // }

  signup()
  {
    this.studentService.signupWithSocialAccount(this.formdata).subscribe(resp=>{
        this.authService.loginWithSocialAccount({
          ProviderName:this.formdata.ProviderName,
          ProviderId:this.formdata.ProviderId,
          LoginType:0
        },false).subscribe(logr=>{
           this.router.navigate(['/member/profile']);
        })
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  
}



