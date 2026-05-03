import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { UserService } from 'app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-reset-password1',
  templateUrl: './reset-password1.component.html',
  styleUrls: ['./reset-password1.component.scss']
})
export class ResetPassword1Component implements OnInit , OnDestroy {

 
  loginerror:string;
  formdata:any;
  confirmPassword:string='';
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private toasterService:ToasterService,
    private userService:UserService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.formdata={
      NewPassword:'',
      Code:null
    }
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param=>{
      this.formdata.Code=param.get('code');
      
   });
  }

  doResetPassword()
  {
    this.loginerror=null;
      this.userService.resetPassword(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res==="OK")
        {
           this.toasterService.pop('success','Account password reset succesfully');
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
