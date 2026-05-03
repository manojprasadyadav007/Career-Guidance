import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit,OnDestroy  {
 
  accountManager:any;
  filepath=environment.filepath;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private userService:UserService) { }
 
  ngOnInit() {
    this.userService.accountManager().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.accountManager=res;
  });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
