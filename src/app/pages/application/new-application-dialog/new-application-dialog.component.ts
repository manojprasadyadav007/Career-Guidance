import { Component, OnInit, OnDestroy } from '@angular/core';
import { appPattern } from 'app/models/site-map.model';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-new-application-dialog',
  templateUrl: './new-application-dialog.component.html',
  styleUrls: ['./new-application-dialog.component.scss']
})
export class NewApplicationDialogComponent implements OnInit , OnDestroy {

  inputText:string;

  emailPattern = appPattern.email;

  termsData:any;

  iAggreeed:boolean;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private miscService:MiscService) { }

  ngOnInit() {
    this.miscService.serviceTerm(7).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.termsData = res;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
