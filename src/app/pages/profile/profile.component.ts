import { Component, OnInit , AfterViewInit  , AfterViewChecked, OnDestroy} from '@angular/core';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import  { CommonService} from 'app/services/common.service';
import {MSMAgentService} from 'app/services/msmagent.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit ,OnDestroy , AfterViewInit , AfterViewChecked{

  currentUser:Login;
  profilestatus:any = true;
  businessCertificateStatus:any ="";
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private authService:AuthenticationService,
    private commonService : CommonService,
    private mSMAgentService :MSMAgentService) { 
      // this.commonService.profileFormStatus.subscribe(status =>{
      //   this.profilestatus = status;
      // });
    }
    
  ngOnInit() {
  
    this.currentUser = this.authService.currentUserSubject.getValue();
    //this.currentUser.AccountVerificationStatus = 1;
  // this.commonService.BusinessStatus.subscribe(data =>{
  //     this.currentUser.BusinessCertFound  = data == true ? 1 :0;
  //     this.currentUser.AccountVerificationStatus = 1;
  //   });
  
 
 
  }
  ngAfterViewInit() {
    if(this.currentUser.RoleId==2 && this.currentUser.AccountVerificationStatus!=1)
    {
      this.mSMAgentService.businessCertStatus().pipe(takeUntil(this.onDestroy$)).subscribe(status =>{
        this.businessCertificateStatus = status.toLowerCase();
      });
    
     
      this.commonService.BusinessProfileStatus.pipe(takeUntil(this.onDestroy$)).subscribe(status =>{
        this.businessCertificateStatus = status.toLowerCase();
        if(status.toLowerCase() == 'uploaded'){
          this.currentUser.BusinessCertFound = 1;
        } else if( status.toLowerCase() == 'pending'){
          this.currentUser.BusinessCertFound = 0;
        }
      });
    }
  }
  ngAfterViewChecked(){
    if(this.currentUser.RoleId===2 && this.currentUser.AccountVerificationStatus!=1)
    {
      this.commonService.profileFormStatus.pipe(takeUntil(this.onDestroy$)).subscribe(status =>{
        this.profilestatus = status;
      });
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  

}
