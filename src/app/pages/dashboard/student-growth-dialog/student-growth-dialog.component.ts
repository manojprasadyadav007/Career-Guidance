import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DashboardService } from 'app/services/dashboard.service';

@Component({
  selector: 'app-student-growth-dialog',
  templateUrl: './student-growth-dialog.component.html',
  styleUrls: ['./student-growth-dialog.component.scss']
})
export class StudentGrowthDialogComponent implements OnInit {
  private onDestroy$: Subject<void> = new Subject<void>();
  showFilterRow:false;
  studentgrowthList:any =[] ;
  studentgrowthData:any;
  title:any = '';
  subtitle:any ='';
  constructor(private dialogRef: MatDialogRef<StudentGrowthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,private Dashboardser :DashboardService) {
      this.studentgrowthData =data; 
      this.title = data.title; 
   //   this.subtitle = data.subtitle;
     }

  ngOnInit() {
    this.Dashboardser.studentGrowth(this.studentgrowthData.service , this.studentgrowthData.institution, this.studentgrowthData.intakeID , this.studentgrowthData.ApplicationType).subscribe(res => {
      this.studentgrowthList = res;
    })
    
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
