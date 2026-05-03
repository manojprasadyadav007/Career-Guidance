import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, OnChanges, SimpleChange } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgramFilterDisplayDialogComponent } from './program-filter-display-dialog/program-filter-display-dialog.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { defaultFilterData } from 'app/models/site-map.model';
import { ReportService } from 'app/services/report.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';

@Component({
  selector: 'app-program-filter-display',
  templateUrl: './program-filter-display.component.html',
  styleUrls: ['./program-filter-display.component.scss']
})
export class ProgramFilterDisplayComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  pageTitle: string = 'Filters';

  @Input()
  programIds: string = '';

  @Input()
  nationality: number;

  @Output()
  programList: EventEmitter<any[]> = new EventEmitter();

  private onDestroy$: Subject<void> = new Subject<void>();

  @Input()
  filterData: any = JSON.parse(JSON.stringify(defaultFilterData));

  currentUser: Login;

  constructor(private matDialog: MatDialog,
    private reportService: ReportService,
    authService: AuthenticationService) {
    this.currentUser = authService.currentUserSubject.getValue();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['programIds']
      && changes['programIds'].previousValue != changes['programIds'].currentValue) {
      this.filterData.ProgramId = this.programIds;
    }

    if (changes['nationality']
      && changes['nationality'].previousValue != changes['nationality'].currentValue) {
      this.filterData.Nationality = this.nationality;
    }
  }

  showFilter() {
    this.matDialog.open(ProgramFilterDisplayDialogComponent, { data: { formdata: JSON.parse(JSON.stringify(this.filterData)) } }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.filterData = res;
          this.doFilter();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  doFilter() {
    if (this.filterData) {
      this.reportService.programByFilter(this.filterData)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.programList.emit(res);
        });
    }
  }

  clearFilter() {
    this.filterData =JSON.parse(JSON.stringify(defaultFilterData));;
    this.filterData.Nationality = this.nationality;
    this.filterData.ProgramId = this.programIds;
    this.doFilter();
  }

}
