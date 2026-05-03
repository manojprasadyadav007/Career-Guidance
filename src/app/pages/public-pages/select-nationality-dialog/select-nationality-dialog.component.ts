import { Component, OnInit, OnDestroy } from '@angular/core';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-select-nationality-dialog',
  templateUrl: './select-nationality-dialog.component.html',
  styleUrls: ['./select-nationality-dialog.component.scss']
})
export class SelectNationalityDialogComponent implements OnInit , OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  value:number;
  countryList:any[];
  nationFilter:any='';
  constructor(private miscService:MiscService) { }

  ngOnInit() {
    this.miscService.country().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{this.countryList=res});
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
