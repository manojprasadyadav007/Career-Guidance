import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { MiscService } from 'app/services/misc.service';
import { InstitutionIntakeService } from 'app/services/institution-intake.service';
import { ToasterService } from 'angular2-toaster';
import { ProgramIntekService} from 'app/services/program-intek.service';

@Component({
  selector: 'app-institution-program-status-update',
  templateUrl: './institution-program-status-update.component.html',
  styleUrls: ['./institution-program-status-update.component.scss']
})
export class InstitutionProgramStatusUpdateComponent implements OnInit , OnDestroy {

 
  instituteId:number=0;
  permission:number;
  private onDestroy$: Subject<void> = new Subject<void>();
  statusList: any[];
  intakeFilter:any;
  programList:any=[];
  currentUser: Login;
  intakeList:any [];
  excel_permisson: number = 0;
  constructor(private miscService : MiscService , private authService : AuthenticationService,
    private intekService: InstitutionIntakeService, private toasterService: ToasterService,
    private route: ActivatedRoute, private router: Router,
    private programIntekService :ProgramIntekService,
    ) { 
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.instituteId = +param.get("id");
    });
  }
  IntekStatus:any;
  intakeItem:any;
  statusFilter:any;
  dataList:any;
  selectedProgram:any;
  disabledFlag:boolean = false;
  columns:any[]=[{ dataField:'ProgramName', title:'Program',type:'', format:'' }]
  showFilterRow:boolean=false;
  gridMessage: string = 'No data';
  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    if (this.currentUser.RoleType === 2) {
      this.instituteId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Institute_BulkProgramUpdate);
    }
    else {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }

    if (this.permission <= 2) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }
   
    if (this.currentUser.RoleType === 2) {
      this.instituteId = this.currentUser.RefId;
      this.dropdownlist();
      this.listStatus();
    } else {
      this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
        this.instituteId = +param.get("id") | 0;
        this.dropdownlist();
        this.listStatus();
      });
    }
    
      
  }

  dropdownlist() {
    this.intekService.intakeList(this.instituteId).pipe(takeUntil(this.onDestroy$)).subscribe((res:any) => {
    this.intakeList  = res;
    this.intakeList.length >0 ? (this.intakeItem =  this.intakeList[0].IntakeName, this.getIntakeProgram(this.intakeList[0].IntakeName) ): 0;
    });
    
  }
  listStatus() {
    this.miscService.statuslist(3, this.currentUser.RoleId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.statusList = res;
    });
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
  onSubmit(){
       
    //let data = this.dataList.map(x => Object.assign({}, x));
     let data= this.dataList.map((ele)=>{
          return { "IntekId" : ele.IntekId, "Status": ele.IntekStatus }
          });
          this.disabledFlag =true;
          this.programIntekService.bulkUpdate({ProgramsIntekStatus:data}).pipe(takeUntil(this.onDestroy$)).subscribe((res:any) =>{
            if(res === 'OK'){
              this.disabledFlag =false;
              this.toasterService.pop("success", "Status updated successfully");
              this.getIntakeProgram(this.intakeItem);
            }
          
        })
  }

  getIntakeProgram(value) {
    if(value){
    this.programIntekService.bulkUpdateList( {"InstituteId":  this.instituteId , "IntakeName":  value}).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
      this.gridMessage = 'No data';
      this.disabledFlag = this.dataList.length >0? false: true;
    });
   }
  }
}
