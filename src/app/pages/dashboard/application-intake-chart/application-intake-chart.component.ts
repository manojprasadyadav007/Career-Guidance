import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';
@Component({
  selector: 'app-application-intake-chart,[app-application-intake-chart]',
  templateUrl: './application-intake-chart.component.html',
  styleUrls: ['./application-intake-chart.component.scss']
})
export class ApplicationIntakeChartComponent implements OnInit , OnDestroy {
listData :any = [];
labels :any = [];
intakeitem:any;
inTakeList:any=[];
appFilter:string='';
fixedPoint:any;
private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private Dashboardservice : DashboardService,
    private router : Router,
  ) {
        
     }

  ngOnInit() {
    this.Dashboardservice.IntakeForChart().pipe(takeUntil(this.onDestroy$)).subscribe((res) => { 
       this.inTakeList= res;
       this.intakeitem = this.inTakeList.length >0 ? this.inTakeList[0].IntakeName : null;
       this.list();
    })
  }

    customizeText(itemInfo){
        return itemInfo.item.argument  +" : "+ itemInfo.item.value ;
    }
    customizeTooltip(arg) {
     return { text:   arg.item.argument + ' : ' + arg.value};
    }
  list(){
    this.Dashboardservice.ApplicationStatusByIntake(this.intakeitem).pipe(takeUntil(this.onDestroy$)).subscribe((res) =>{
        this.listData= res;
      })
  }

  changeIntake()
  {
   this.list();
  }

  onItemClick(evt){
      this.router.navigate(['/member/application'],{ queryParams: { status: evt.item.argument,intake:this.intakeitem}});
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
   this.onDestroy$.complete();
   }
}
