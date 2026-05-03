import { Component, OnInit, Input, SimpleChange, OnDestroy } from '@angular/core';
import { ReportService } from 'app/services/report.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-program-listing-with-filter',
  templateUrl: './program-listing-with-filter.component.html',
  styleUrls: ['./program-listing-with-filter.component.scss']
})
export class ProgramListingWithFilterComponent implements OnInit ,OnDestroy {

  constructor(private reportService:ReportService) { }

  @Input()
  programList:any[];

  @Input()
  formdata:any;

  programIds:string='';

  private onDestroy$: Subject<void> = new Subject<void>();

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['programList'] && changes['programList'].previousValue != changes['programList'].currentValue) {
       try{
        this.programIds='';
        this.programIds=this.programList.map(res=>{
          return res.programs.map(res1=>{
            return res1.ProgramId
          })
        }).reduce(function(a, b){ return a.concat(b); }).join(",");
       }
       catch(e)
       {

       }
      

       this.doFilterProgram();
    }
  }

  ngOnInit() {
  }

  doFilterProgram()
  {
    if(this.formdata)
    {
      this.formdata.ProgramId=this.programIds;
      this.reportService.programByFilter(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.programList=res;
      });
    }
  }

  onFilterChange(value:any)
  {
    this.formdata=value;
    this.doFilterProgram()
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
