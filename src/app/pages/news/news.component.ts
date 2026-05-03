import { Component, OnInit, OnDestroy } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { Login } from 'app/models/login.model';
import { NewsService } from 'app/services/news.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { AddNewsComponent } from './add-news/add-news.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit , OnDestroy{

  

  currentUser:Login;
  gridMessage: string = 'No data';
  permission:number=0;

  dataList:any[];
  columns:any[]=[
    {
      dataField:'NewsSubject',
      title:'Subject',
      type:'',
      format:''
    },
    {
      dataField:'StartDate',
      title:'Start',
      type:'date',
      format:'dd MMM yyyy'
    },
    {
      dataField:'EndDate',
      title:'End',
      type:'date',
      format:'dd MMM yyyy'
    },
    {
      dataField:'Status',
      title:'Status',
      type:'',
      format:''
    },
  
  ];
  showFilterRow:boolean=false;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private newsService:NewsService,
    private matDialog:MatDialog,
    private authService:AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,) {
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.permission = authService.checkPermission(sitemap.News);
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {
    this.list();
  }

  add(newsId?:number)
  {
      this.matDialog.open(AddNewsComponent,{data:{
        NewsId:newsId
      },width:'50%'}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res)
        {
          if(newsId){
            this.toasterService.pop('success', "Updated successfully");
          }else{
            this.toasterService.pop("success", "Saved successfully");
          }
          this.list();
        }
      })
  }

  delete(newsId:number)
  {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.newsService.delete(newsId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success", "Deleted successfully");
            this.list();
        });
      }
    });
  }

  list()
  {
    this.gridMessage = 'Loading';
    this.newsService.list().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      res.forEach((v)=>{
        v.Status =( v.NewsStatus===0 ? 'Hide' : 'Display');
      });
     this.dataList=res;
     this.gridMessage = 'No data';
    });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'News&Updates', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
