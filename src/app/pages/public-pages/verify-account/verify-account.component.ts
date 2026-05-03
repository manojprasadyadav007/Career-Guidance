import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';



@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit,OnDestroy {
  result:string;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private userService:UserService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit() {
      this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param=>{
         var code =param.get('code');
          this.userService.verifyEmail(code).subscribe(res=>{
              if(res!="OK")
              {
                  this.result='invalid or expired verification link, please check your email';
              }
              else
              {
                this.result=res;
              }
          });
      });
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
