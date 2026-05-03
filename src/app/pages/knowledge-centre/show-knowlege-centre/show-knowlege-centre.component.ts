import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Login } from 'app/models/login.model';
import { KnowledgeCentreService } from 'app/services/knowledge-centre.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { AddKnowledgeCentreComponent } from '../add-knowledge-centre/add-knowledge-centre.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from "angular2-toaster";
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-knowlege-centre',
  templateUrl: './show-knowlege-centre.component.html',
  styleUrls: ['./show-knowlege-centre.component.scss']
})
export class ShowKnowlegeCentreComponent implements OnInit, OnDestroy {

  currentUser: Login;

  permission: number = 0;
  gridMessage: string = 'No data';
  dataList: any[];

  columns: any[] = [
    {
      dataField: 'DocumentTitle',
      title: 'Title',
      type: '',
      format: ''
    },
    {
      dataField: 'CategoryName',
      title: 'Category',
      type: '',
      format: ''
    },
    {
      dataField: 'DisplayTo',
      title: 'For',
      type:  '',
      format: ''
    },
    {
      dataField: 'DocumentStatus',
      title: 'Status',
      type:  '',
      format: ''
    },
    {
      dataField: 'UserName',
      title: 'Upload By',
      type: '',
      format: ''
    }

  ];

  showFilterRow: boolean = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private knowledgeCentreService: KnowledgeCentreService,
    private matDialog: MatDialog,
    private authService: AuthenticationService,
    private toasterService:ToasterService,
    private activityLog: ActivityLogService,) {
      
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = authService.checkPermission(sitemap.KnowledgeCentre);
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.list();
  }

  add(KnowledgeCID?: number) {
    this.matDialog.open(AddKnowledgeCentreComponent, {
      data: {
        KnowledgeCID: KnowledgeCID
      }
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        if(KnowledgeCID){
          this.toasterService.pop("success", "Updated successfully");
        }else{
          this.toasterService.pop("success", "Saved successfully");
        }
        this.list();
      }
    })
  }

  delete(KnowledgeCID: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.knowledgeCentreService.delete(KnowledgeCID).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success", "Deleted successfully");
          this.list();
        });
      }
    });
  }

  list() {
    this.gridMessage = 'Loading';
    this.knowledgeCentreService.list().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList=   res.map((v) => {
        //  v.Status = (v.DisplayTo === 0 ? 'hide' : 'display');
          return{
            DocumentTitle: v.DocumentTitle, CategoryName: v.CategoryName, DisplayTo: this.getDisplayToName(v.DisplayTo), 
            DocumentStatus: v.DocumentStatus,
            UserName: v.UserName,
            KnowledgeCID: v.KnowledgeCID
          }
        });
        this.gridMessage = 'No data';
    });
  }

  getDisplayToName(id) {
    if (id === 0) {
      return 'All';
    }
    else if (id === 1) {
      return 'Institution';
    }
    else if (id === 2) {
      return 'Agent';
    }
    else if (id === 3) {
      return 'Team';
    }
    else {
      return 'None';
    }
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Knowledge Base', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
