import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { StudentSchoolService } from 'app/services/student-school.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AddSchoolComponent } from 'app/pages/students/school/add-school/add-school.component';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-display-school',
  templateUrl: './display-school.component.html',
  styleUrls: ['./display-school.component.scss']
})
export class DisplaySchoolComponent implements OnInit,OnChanges,OnDestroy {

  @Input()
  parentId:number;

  @Input()
  parentType:number;

  @Input()
  permission:number;

  schoolList:any[];
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private schoolService:StudentSchoolService,
    private matDialog:MatDialog,
    private toasterService: ToasterService) { }

  ngOnInit() {
  }

  ngOnChanges()
  {
    this.list();
  }

  list()
  {
    this.schoolService.list(this.parentId,this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.schoolList=res;
    })
  }

  delete(schoolId:number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.schoolService.delete(schoolId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.toasterService.pop('success', 'School deleted successfully');
          this.list();
        })
      }
    });
  }

  add(schoolId?:number)
  {
    this.matDialog.open(AddSchoolComponent,
      { data: { SchoolId: schoolId,ParentId:this.parentId,ParentType:this.parentType },width:'70%',minWidth:'400px' }
    ).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
       this.list();
      }
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
