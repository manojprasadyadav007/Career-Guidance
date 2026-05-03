import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from 'app/services/application.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { StudentService } from 'app/services/student.service';
import { NewApplicationDialogComponent } from '../new-application-dialog/new-application-dialog.component';
import { SearchStudentComponent } from 'app/pages/search-student/search-student.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { RefundDocumentsComponent } from 'app/pages/application/refund-documents/refund-documents.component';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-application-detailed',
  templateUrl: './show-application-detailed.component.html',
  styleUrls: ['./show-application-detailed.component.scss']
})
export class ShowApplicationDetailedComponent implements OnInit  , OnDestroy{
  gridMessage: string = 'No data';
  data: any;

  columns: any[] = [
    { title: "Review", data: "ReviewStatus", type: "", format: "" },
    { title: "MSM ID", data: "StudentId", type: "string", format: "" },
    { title: "Status", data: "StatusName", type: "", format: "" },
    { title: "First Name", data: "FirstName", type: "", format: "" },
    { title: "Middle Name", data: "MiddleName", type: "", format: "" },
    { title: "Last Name", data: "LastName", type: "", format: "" },
    { title: "Application Date", data: "ApplicationDate", type: "date", format: "dd MMM yyyy" },
    { title: "City", data: "City", type: "", format: "" },
    { title: "Province", data: "Province", type: "", format: "" },
    { title: "Submit Date", data: "SubmitDate", type: "date", format: "dd MMM yyyy" },
    { title: "Counsellor", data: "AssignedTo", type: "", format: "" },
    { title: "DOB", data: "DateOfBirth", type: "date", format: "dd MMM yyyy" },
    { title: "Email ID", data: "Email", type: "", format: "" },
    { title: "Contact Number", data: "MobileNo", type: "", format: "" },
    { title: "Intake", data: "IntakeName", type: "", format: "" },
    { title: "Program", data: "ProgramName", type: "", format: "" },
    { title: "Institution", data: "InstName", type: "", format: "" },
    { title: "Student ID", data: "EnrollmentNo", type: "", format: "" },
    { title: "Logged By", data: "AddUser", type: "", format: "" },
    { title: "Citizenship", data: "Citizenship", type:"", format:"" },
  ];

 

  currentUser: Login;
  permission: number = 0;
  keyword: any;
  btnClick:any;
  can_add:boolean=false;
  can_delete:boolean=false;
  can_delete_after_submit:boolean=false;
  private onDestroy$: Subject<void> = new Subject<void>();
  status:string;
  EventType:any='Recently Modified';
  intake:string;
  showFilterRow:boolean=false;
  ddl_val: any = 'Recently Modified';
  excel_permisson: number = 0;
  keyworderror: boolean = false;

  constructor(private applicationService: ApplicationService,
    private toasterService: ToasterService,
    private matDialog: MatDialog,
    private router: Router,
    private authService: AuthenticationService,
    private route:ActivatedRoute,
    private studentService:StudentService,
    private activityLog: ActivityLogService,
  ) {

    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = this.authService.checkPermission(sitemap.Applications);
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    this.can_add = this.permission>1 && this.currentUser.RoleType!=2;
    this.can_delete = this.permission>2 && this.currentUser.RoleType!=2;
    this.can_delete_after_submit = this.currentUser.RoleId!=2 && this.currentUser.RoleId!=3;
  }

  // textAreaEmpty(keyword){
  //   if(keyword == '')
  //   {
  //     this.list('');
  //   }
  // }


  ngOnInit() {

    this.route.queryParamMap.pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.status=res.get('status');
      this.intake=res.get('intake');
    });

    if (this.permission <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }
    if (this.currentUser.RoleType!=1) {
      this.columns.splice(this.columns.findIndex(d => d.title === 'Review'), 1);
    }
    if(this.currentUser.RoleId===3){
      this.columns.splice(this.columns.findIndex(d => d.title === 'First Name'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Middle Name'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Last Name'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Email ID'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Student ID'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'MSM ID'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'City'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'DOB'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Province'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Contact Number'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Logged By'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Citizenship'), 1);
    }
    if(this.currentUser.RoleType===2){
      this.columns.splice(this.columns.findIndex(d => d.title === 'Institution'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Logged By'), 1);
    }
    this.list(this.EventType);
  }

  list(keyword:any) {
    this.gridMessage = 'Loading';
    this.applicationService.listDetailed(keyword,this.status,this.intake).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.data = res;
      this.gridMessage = 'No data';
    });
  }

  onDelete(item) {
    if(item.isSubmited!=0 && !this.can_delete_after_submit)
    {
      this.toasterService.pop('error', "Application can't delete after submit" );
      return;
    }
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.applicationService.delete(item.ApplicationId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success', 'Application deleted successfully');
          this.list('');
        });
      }
    });
  }

  onEdit(item) {
    this.router.navigate(['member/application/view', item.ApplicationId], {});
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'advanceButtonTemp'
    });

    //   e.toolbarOptions.items.unshift({
    //     location: 'brfore',
    //     template: 'filter'
    // });

  }



  add() {
    // don't show popup for student and msm team
    if(this.currentUser.RoleId===3)
    {
      this.router.navigate(['/member/application/new']);
      return;
    }

    // show student selection popup to employee
    if(this.currentUser.RoleType===1)
    {
      this.matDialog.open(SearchStudentComponent, { width: '80%',minWidth:'400px' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          if (res > 0) {
            this.router.navigate(['/member/application/new/'+res]);
          }
          else {
            this.router.navigate(['/member/application/new']);
          }
        }
      });
      return;
    }

    this.matDialog.open(NewApplicationDialogComponent, {
      width:'50%',minWidth:'300px'
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(email => {
      if (email) {
        this.getStudent(email);
      }
    });
  }

  getStudent(email:string)
  {
    this.studentService.getShortDetailByEmail(email).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      if(res)
      {
        if(this.currentUser.RoleId===2)
        {
          if(res.AgentId!=this.currentUser.RefId)
          {
            this.toasterService.pop('error','Application student registered with other Agent');
            return;
          }
        }

        this.router.navigate(['/member/application/new/'+res.StudentId]);
        return;
      }
      else{
        this.router.navigate(['/member/application/new/0/'+email]);
      }
    });
  }

  edit(applicationId:number)
  {
    this.router.navigate(['/member/application/view/'+applicationId]);
  }

  changeOption(event: any) {
    this.ddl_val = event;
    this.list(event);
    if(this.keyworderror)
    {
      this.keyworderror = false;
    }
  }

  searchByKeyword() {
    this.btnClick=true;
    //    if (this.keyword==true) {this.keyworderror=!this.keyworderror;}
    if(this.keyword==undefined || this.keyword == '')
    {
      this.keyworderror= true;
      // this.list("");
    }else
    {
      this.keyworderror= false;
      this.list(this.keyword);
    }
  }

  uploadDocumentsForRefund(applicationId) {

    this.matDialog.open( RefundDocumentsComponent, {
      data: {
        parentId: applicationId, parentType: 16,
        permission: this.permission, showRemark: false, addButtonRestrict: true
      }
    }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        
        if(res.status == 'Ok') {   this.list(this.EventType);}
      });
  }

  onBlurMethod() {
    if(this.keyword == '') {
      this.list(this.ddl_val);
    }
    if(this.keyworderror)
     {
      this.keyworderror = false;
    }
  }

  searchByEnter(){
    if (this.keyword == undefined || this.keyword == '') {
      this.keyworderror = true;
    } else {
      this.keyworderror = false;
      this.list(this.keyword);
    }
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Applications', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
