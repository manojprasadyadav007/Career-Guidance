import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { appPattern } from 'app/models/site-map.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-forgoat-password1',
  templateUrl: './forgoat-password1.component.html',
  styleUrls: ['./forgoat-password1.component.scss']
})
export class ForgoatPassword1Component implements OnInit,  OnDestroy {

  result:string;
  userNameLength = 0;
  formdata:any;
  modelPattern = appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.formdata={UserName:''};
    
  }
  valueChange(value){
    this.userNameLength = value.data;
    if(this.userNameLength == null){
      this.result = '';
    }
  }
  

  doReset(form:NgForm)
  { 
    if (form.invalid) {
      return;
    }
    this.userService.forgotPassword(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
       if(res ==="OK")
       {
          this.result='<span class="text-success">Reset link sent on your registered Email ID</span>';
       }
       else
       {
          this.result ='<span class="text-danger">'+ res+"</span>";
       }
     })
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
