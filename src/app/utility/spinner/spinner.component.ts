import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from 'app/services/spinner.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
}) 
export class SpinnerComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();

  val: number = 0;

  constructor(public spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.isLoading.pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.val = res;
    });
  }

  public ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
