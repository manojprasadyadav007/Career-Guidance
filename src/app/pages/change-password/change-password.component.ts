import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  loginerror:string;
  formdata:any;
  confirmPassword:string='';

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private authService:AuthenticationService,
    private toasterService:ToasterService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit() {
    this.formdata={
      UserId:this.authService.currentUserSubject.getValue().UserId,
      CurrentPassword:'',
      NewPassword:''
    }
  }

  doChangePassword(form:NgForm)
  {
    this.loginerror=null;

    if(form.invalid)
    {
        return;
    }

      this.userService.changePassword(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res==="OK")
        {
           this.toasterService.pop('success','Account password change succesfully');
           this.authService.logout();
           this.router.navigate(['/signin']);
        }
        else
        {
          this.loginerror=res;
        }
      })
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
