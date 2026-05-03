import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AddCountryComponent } from './add-country/add-country.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { InstCountryService } from 'app/services/inst-country.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap  } from 'app/models/site-map.model';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit , OnDestroy{


  dataList:any[];

  columns:any[]=[
    {
      dataField:'CountryName',
      title:'Name',
      type:'',
      format:''
    }];
    gridMessage: string = 'No data';
    showFilterRow:boolean=false;

  // columnToDisplay: string[] = ['Name', 'Action'];
   // contactList: MatTableDataSource<any>;

  @Input()
  institutionId: number = 0;

  @Input()
  permission:number;

  @Input()
  parentName: '';

  currentUser:Login;
  isGlobalMarketingFound:boolean=false;

  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private instCountryService: InstCountryService,
    private authService:AuthenticationService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,) { 
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
      
    }

  ngOnInit() {

    if(this.currentUser.RoleType === 2) {
      this.institutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Region_of_Marketing);
    }
   
    if (this.institutionId > 0) {
      this.listCountry();
    }
  }

  listCountry() {
    this.gridMessage = 'Loading';
    this.instCountryService.listForTab(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      //  this.contactList = new MatTableDataSource(res);
      this.dataList = res
      this.gridMessage = 'No data';
      this.isGlobalMarketingFound = res.filter(d=>d.CountryId===-1).length>0;
    });
  }

  delete(instDescId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.instCountryService.delete(instDescId,this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Country deleted successfully");
            this.listCountry();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  add() {
    this.matDialog.open(AddCountryComponent,
      { data: { institutionId: this.institutionId }, width: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Country saved successfully");
          this.listCountry();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.institutionId, this.parentName, 'Region of Marketing Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
