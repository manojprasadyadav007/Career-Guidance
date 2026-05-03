import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { StudentService } from 'app/services/student.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.scss']
})
export class SearchStudentComponent implements OnInit, OnDestroy {

  studentList: MatTableDataSource<any>;
  keyword: string = "";
  columnToDisplay: string[] = ['Name', 'Email', 'MobileNo', 'City', 'Education', 'Action'];
  gridMessage: string = 'No data';
  keyworderror: string = undefined;
  private onDestroy$: Subject<void> = new Subject<void>();
  dataList: any[];
  columns: any[] = [
    { dataField: 'FirstName', title: 'Name', type: '', format: '' },
    { dataField: 'Email', title: 'Email', type: '', format: '' },
    { dataField: 'MobileNo', title: 'Mobile Number', type: '', format: '' },
    { dataField: 'City', title: 'City', type: '', format: '' },
    { dataField: 'EduLevelName', title: 'Education', type: '', format: '' },
  ];
  showFilterRow: boolean = false;
  excel_permisson: number = 0;
  constructor(private studentService: StudentService, public dialogRef: MatDialogRef<SearchStudentComponent>,
    authService: AuthenticationService,
    private activityLog: ActivityLogService) {
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {

  }

  close(data) {
    this.dialogRef.close(data);
  }

  onsubmit() {
    if (this.keyword == "") {
      this.keyworderror = "enter name or email";
      return;
    }
    this.gridMessage = 'Loading';
    this.studentService.search(this.keyword).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      res.forEach((elem) => {
        elem.FirstName = elem.FirstName + elem.MiddleName + " " + elem.LastName;
      });
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Eligibility Test',  'Select Student Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
