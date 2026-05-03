import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { KnowledgeCentreService } from 'app/services/knowledge-centre.service';
import { KnowledgeCentreDetailComponent } from './knowledge-centre-detail/knowledge-centre-detail.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-knowledge-centre-display',
  templateUrl: './knowledge-centre-display.component.html',
  styleUrls: ['./knowledge-centre-display.component.scss']
})
export class KnowledgeCentreDisplayComponent implements OnInit, OnChanges, OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private knowledgeCentreService: KnowledgeCentreService,
    private matDialog: MatDialog) { }
  data: any = [];
  orginalData: any = [];
  searchData: any;
  pageIndex: number = 1;

  displayList: any = [];
  categoryList;
  ngOnInit() {
    this.list();
  }

  openEvent(knowledgeCID: any) {
    this.matDialog.open(KnowledgeCentreDetailComponent, {
      data: {
        knowledgeCID: knowledgeCID
      }
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.list();
      this.searchData = '';
    });
  }

  list() {

    this.knowledgeCentreService.displayList("").pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.displayList = res;
    });
  }
  filterParam1(value: string) {
    if (value && value.trim().length > 0) {
      this.knowledgeCentreService.displayList(value).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.displayList = res;
      });
    }
    else {
      this.list();
    }
  }
  ngOnChanges() {
    if (this.displayList) {
      this.pageIndex = 1;
      this.displayList.forEach(value => {
        value.p = 1;
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
