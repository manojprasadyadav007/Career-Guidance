import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MiscService } from 'app/services/misc.service';
import { MatDialog } from '@angular/material';
import { ViewTearmAndConditionsComponent } from './view-tearm-and-conditions/view-tearm-and-conditions.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-terms-and-condition,[app-terms-and-condition]',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit , OnDestroy {

  @Input()
  form: NgForm;

  @Input()
  parentType: number;
  
  data: any;

  isAgree: boolean = false;

  @Input()
  required:boolean=true;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private miscService: MiscService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.miscService.serviceTerm(this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.data = res;
    });
  }

  open() {
    this.matDialog.open(ViewTearmAndConditionsComponent, { data: { content: this.data.AgreementContents },minWidth:'70%',minHeight:'80%'}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.isAgree = res;
      }
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
