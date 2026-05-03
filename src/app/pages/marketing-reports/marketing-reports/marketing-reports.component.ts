import { Component, OnDestroy, OnInit , AfterViewInit } from '@angular/core';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubTitleService } from 'app/services/sub-title.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MarketingReportService } from  'app/services/marketing-report.service';

@Component({
  selector: 'app-marketing-reports',
  templateUrl: './marketing-reports.component.html',
  styleUrls: ['./marketing-reports.component.scss']
})
export class MarketingReportsComponent implements OnInit, OnDestroy , AfterViewInit {

  reportName: string = '';
  gridMessage: string = 'No data';
  excel_permisson:any =1;
  formdata={fromdate : new Date() ,todate : new Date()};
  reportData:any;
  reports: any[] = [
    { ReportName: 'marketingmanager-master', title: 'Marketing Master Report', Permission: sitemap.marketing_reports, }]

    private onDestroy$: Subject<void> = new Subject<void>();
    showFilterRow: boolean = false;
    showAdvance:any = false;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private titleService : SubTitleService,
    private authService: AuthenticationService,
    private marketingReportService :MarketingReportService) { }

  ngOnInit() {
    this.formdata.fromdate = new Date();
    this.formdata.fromdate.setMonth(this.formdata.todate.getMonth()-2);
    var u=  this.router.url.split('/');
    
    this.reportName = u[u.length-1].toLowerCase();

    var sitemaps = this.reports.filter(d =>
      d.ReportName.toLowerCase() === this.reportName).map(d => d.Permission);
    if (!sitemaps || this.authService.checkPermission(sitemaps[0]) <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }
   // this.getData();
  
  }
  getData(){
    this.marketingReportService.report(this.reportName , this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.reportData = res;
        this.gridMessage = 'No data';
    });

  }
  onCellPrepared (e) {

    try{
      this.reportData.columns.forEach((ele)=>{
        if(ele.header === e.column.caption){
            if (e.column.caption == ele.columnDef && ele.isHTML) {
            console.log(e);
               e.cellElement.innerHTML = '<span>'+ e.key[e.column.dataField]+'</span>';
               e.cellElement.className= 'text-wrap';
              }
        }
      });
      //console.log(e.column.caption);
       
    }
    catch(e){

    }
  }  
  onCellPreparedPivot(e){
    console.log(e);
   // this.onCellPrepared(e); 
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  ngAfterViewInit(){

  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

}

