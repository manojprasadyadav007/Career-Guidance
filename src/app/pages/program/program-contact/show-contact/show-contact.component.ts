import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog} from '@angular/material';
import { ProgramContactService } from 'app/services/program-contact.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { ActivityLogService } from 'app/services/activity-log.service';


@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.scss']
})
export class ShowContactComponent implements OnInit , OnDestroy {
  
  // columnToDisplay: string[] = ['Name', 'Email', 'ContactNo',  'Action'];
  // contactList: MatTableDataSource<any>;
  gridMessage: string = 'No data';
  dataList:any[];
  

  columns:any[]=[
    { dataField:'Name',title:'User',type:'',format:''},
    { dataField:'Email',title:'Email',type:'',format:''},
    { dataField:'ContactNo',title:'Contact Number',type:'',format:''},
  ];

  showFilterRow:boolean=false;
  @Input()
  programId: number = 0;

  @Input()
  parentName: '';
  
  permission:number=0;

  @Input()
  showCard: boolean = true;
  private onDestroy$: Subject<void> = new Subject<void>();

  currentUser:Login;
  excel_permisson: number = 0;
  
  constructor(private programContactService: ProgramContactService,
    private matDialog:MatDialog,
    private authService:AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService
    ) { 
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
    if(this.currentUser.RoleType === 2) {
      this.permission = this.authService.checkPermission(sitemap.Programs);
    }
    else
    {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }
    
    if(this.programId>0)
    {
      this.listContact();
    }
  }

  listContact() {
    this.gridMessage = 'Loading';
    this.programContactService.list(this.programId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
       this.dataList = res;
       this.gridMessage = 'No data';
    });
  }
 

  deleteContact(contactid: number) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.programContactService.delete(contactid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Contact deleted successfully");
            this.listContact();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  addContact()
  {
     this.matDialog.open(AddContactComponent,
      {data:{programId:this.programId}})
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
       if(res)
       {
          this.listContact();
       }
     });
  }

  activitylog(){
    this.activityLog.activitylog(this.programId, this.parentName, 'Contact Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
