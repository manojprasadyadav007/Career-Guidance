import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'app/services/student.service';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';


@Component({
  selector: 'app-show-students-detailed',
  templateUrl: './show-students-detailed.component.html',
  styleUrls: ['./show-students-detailed.component.scss']
})
export class ShowStudentsDetailedComponent implements OnInit , OnDestroy {

  data:any;
  columns:any[]=[
     { title:"MSM ID", data: "StudentId", type: "string",format: ""  },
     { title:"Status", data: "Status", type: "", format: ""   },
     { title:"First Name", data: "FirstName", type: "",format:""   },
     { title:"Middle Name", data: "MiddleName", type: "",format:""   },
     { title:"Last Name", data: "LastName", type:"",format:""   },
     { title: "Gender", data: "Gender", type:"", format:""  },
     { title:"Date Of Birth", data: "DateOfBirth", type:"date", format:"dd MMM yyyy"  },
     { title:"Contact Number", data: "MobileNo", type:"", format:""   },
     { title:"Email ID", data: "Email",type:"", format:""   },
     { title: "Skype ID", data: "SkypeId", type:"", format:""   },
     { title: "City", data: "City", type:"", format:""   },
     { title: "Province", data: "Province", type:"", format:""  },
     { title: "Citizenship", data: "Citizenship", type:"", format:""   },
     { title: "Agent", data: "Agent", type:"", format:""   },
     { title: "Add Stamp", data: "AddStamp", type:"date", format:"dd MMM yyyy"},
  ];
  keyworderror:any= false;
  currentUser:Login;
  permission:number=0;
  excel_permisson :number=0;
  showFilterRow:boolean=false;
  searchFilter;
  ModifiedStatus = "Recently Modified"
  ddl_value:any = 'recently modified';
  modifiedStauts = [
    {value: 'all', viewValue: 'All'},
    {value: 'Recently Modified', viewValue: 'Recently modified'},
    {value: 'Last Modified', viewValue: 'Last 10 modified'},
  ];
  gridMessage: string = 'No data';
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private studentService:StudentService,
    private activityLog: ActivityLogService,
    private authService:AuthenticationService,
    private matDialog:MatDialog,
    private router:Router,
    private toasterService:ToasterService
    ) { 
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.permission = this.authService.checkPermission(sitemap.Students);
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    }
    

  ngOnInit() {
    if(this.permission <=0)
    {
        this.router.navigate(['/member/unauthorized']);
        return;
    }
    this.list(this.ModifiedStatus);
  }

  sendDropdownValue(inputText){
    this.list(inputText);
    if(this.keyworderror){this.keyworderror=false};
  }

  searchByKeyword(keyword) {
    if(keyword==undefined || keyword == '')
    {
      this.keyworderror= true;
      //this.list("");
    }else
    {
      this.keyworderror= false;
      this.list(keyword);
    }
  }

  searchByEnter(keyword){
    if (keyword == undefined || keyword == '') {
      this.keyworderror = true;
    } else {
      this.keyworderror = false;
      this.list(keyword);
    }
  }

  list(keyWord)
  {
    this.gridMessage = 'Loading';
    this.studentService.listDetailed(keyWord).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.data=res;
       this.gridMessage = 'No data';
    });
  }

  onDelete(item)
  {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.studentService.delete(item.StudentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop('success','Student deleted successfully');
            this.list('');
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  onEdit(item)
  {
    this.router.navigate(['member/students/edit-student',  item.StudentId], {});
  }

  sendInvitation(Id){
  this.studentService.sendInvitations(Id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
   if (res === "Ok") {
     this.toasterService.pop('success','Email invitation sent successfully');
     }
     else {
      this.toasterService.pop('error','Something went wrong.please try again');
     }
  })
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'advanceButtonTemp'
  });
  }
  
  edit(studentId:number)
  {
    this.router.navigate(['member/students/edit-student', studentId], {});
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Students', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }
  


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onBlurMethod(searchFilter) {
    if(searchFilter == '') {
      if(this.keyworderror) {this.keyworderror=false} 
      this.list(this.ModifiedStatus);
    }
  }

}
