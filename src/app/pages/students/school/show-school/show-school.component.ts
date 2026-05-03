import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AddSchoolComponent } from '../add-school/add-school.component';
import { StudentSchoolService } from 'app/services/student-school.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-show-school',
  templateUrl: './show-school.component.html',
  styleUrls: ['./show-school.component.scss']
})
export class ShowSchoolComponent implements OnInit  , OnDestroy{

  @Input()
  parentId:number;

  @Input()
  parentType:number;


  @Input()
  permission:number;

  schoolList:any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private schoolService:StudentSchoolService,
    private matDialog:MatDialog) {

   }

  ngOnInit() {
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
