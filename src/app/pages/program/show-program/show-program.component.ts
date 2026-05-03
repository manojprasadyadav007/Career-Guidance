import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProgramService } from 'app/services/program.service';
import { InstituteService } from 'app/services/institute.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { SubTitleService } from 'app/services/sub-title.service';
import { ToasterService } from 'angular2-toaster';
import { ShowProgramMaterialDialogComponent } from '../program-material/show-program-material-dialog/show-program-material-dialog.component';
import { ShowProgramContactDialogComponent } from '../program-contact/show-program-contact-dialog/show-program-contact-dialog.component';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-show-program',
  templateUrl: './show-program.component.html',
  styleUrls: ['./show-program.component.scss']
})
export class ShowProgramComponent implements OnInit, OnDestroy {


  gridMessage: string = 'No data';
  dataList: any[];
  columns: any[] = [
    {
      dataField: 'ProgramName',
      title: 'Name',
      type: '',
      format: ''
    },
    {
      dataField: 'ProgramCode',
      title: 'Code',
      type: '',
      format: ''
    },
    {
      dataField: 'Duration',
      title: 'Duration',
      type: '',
      format: ''
    },
    {
      dataField: 'ProgramLevel',
      title: 'Level',
      type: '',
      format: ''
    },
    {
      dataField: 'ProgramDiscipline',
      title: 'Discipline',
      type: '',
      format: ''
    },
    {
      dataField: 'Specialization',
      title: 'Specialization',
      type: '',
      format: ''
    },
    {
      dataField: 'ProgramStatus',
      title: 'Status',
      type: '',
      format: ''
    },
    {
      dataField: 'OpenIntake',
      title: 'Available Intake',
      type: '',
      format: ''
    },
  ];

  instituteId: number = 0;
  institutename: string = 'Loading...';
  instiPartnerType;
  currentUser: Login;
  parentRoute: string = "";

  private onDestroy$: Subject<void> = new Subject<void>();
  permission: number = 0;
  formdata: any = { keyword: '' };
  showFilterRow: boolean = false;

  canApply: boolean = true;
  excel_permisson: number = 0;

  constructor(private programService: ProgramService,
    private instService: InstituteService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private authService: AuthenticationService,
    private subTitleService: SubTitleService,
    private toasterService: ToasterService,
    private location: Location,
    private activityLog: ActivityLogService
  ) { 
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
   }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    if (this.currentUser.RoleType === 2) {
      this.instituteId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Programs);
    }
    else {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }

    if (this.permission <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }

    if (this.currentUser.UserId > 0) {
      this.parentRoute = "member/";
    }

    if (this.currentUser.RoleType === 2) {
      this.instituteId = this.currentUser.RefId;
      this.listProgram();
    } else {
      this.route.paramMap.subscribe(param => {
        this.instituteId = +param.get("institutionid") | 0;
        this.getInstituteDetail();
        this.listProgram();
      });
    }

    this.checkCanApply();

  }
  listProgram() {
    this.gridMessage = 'Loading';
    this.programService.list(this.instituteId, this.formdata.keyword).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  deleteProgram(programid: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.programService.delete(programid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success','Program deleted successfully');
          this.listProgram();
        });
      }
    });
  }

  editProgram(programid: number) {
    if (this.currentUser.RoleId != 2) {
      this.router.navigate(['member/institutions/programs/edit-program', this.instituteId, programid], {});
    }
    else {
      window.open(this.location.prepareExternalUrl('/institutions/programs/details-program/' + programid));
    }
  }

  openInNewTab(programid: number) {
    window.open(this.location.prepareExternalUrl('/institutions/programs/details-program/' + programid));
  }

  addProgram() {
    this.router.navigate(['member/institutions/programs/add-program', this.instituteId, 0], {});
  }

  getInstituteDetail() {
    this.instService.getShortDetail(this.instituteId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.subTitleService.name.next(res.InstName);
      this.institutename = res.InstName;
      this.instiPartnerType = res.PartnerTypeId;
      this.checkCanApply();
    });
  }
  
  clone(progId: number) {
    this.matDialog.open(ConfirmBoxComponent, { data: { content: ' Are you sure want to clone program' } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.programService.clone(progId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.toasterService.pop('success','Program cloned successfully');
            this.listProgram();
          }
        });
      }
    });

  };

  activitylog(){
    this.activityLog.activitylog(this.instituteId, 'Program', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  showMaterialDialog(programId: number) {
    this.matDialog.open(ShowProgramMaterialDialogComponent,
      {
        data: { instituteId: this.instituteId, programId: programId },
        width: '70%', minWidth: '400px'
      });
  }

  showContactDialog(programId: number) {
    this.matDialog.open(ShowProgramContactDialogComponent,
      {
        data: { programId: programId },
        width: '70%', minWidth: '400px'
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

   // for agent user check institutite is authorized or not hide apply button if not authorized
   checkCanApply() {
    if (this.currentUser.RoleId === 2) {
      if(this.instiPartnerType === 2){
        this.canApply = true
        return
      }
      this.canApply = false;
      this.authService.assignedInstitutionIds().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res.length > 0) {
          if (res.findIndex(d => +d === +this.instituteId) >= 0) {
            this.canApply = true;
          }
        }
      });
    }
  }
}
