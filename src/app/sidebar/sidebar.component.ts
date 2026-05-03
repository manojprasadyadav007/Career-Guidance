import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { environment } from 'environments/environment';
import PerfectScrollbar from 'perfect-scrollbar';
import { InstituteService } from 'app/services/institute.service';
import html2canvas from 'html2canvas';
import { FeedbackComponent } from 'app/utility/feedback/feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { ScreenshotService } from 'app/services/screenshot.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MenuService } from 'app/services/menu.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { StudentDocumentService } from 'app/services/student-document.service';
import { UploadDocumentsComponent } from 'app/pages/students/student-document/upload-documents/upload-documents.component';
import { MiscService } from 'app/services/misc.service';
import { parentType } from 'app/models/site-map.model';
import { OnDocumentUploadService } from 'app/services/on-document-upload.service';
import  { CommonService } from 'app/services/common.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES: RouteInfo[] = [
  { path: '/dashboard/program-updates', title: 'Program Updates', icon: 'user', class: '' },
  { path: '/kpi/dashboard', title: 'KPI Dashboard', icon: 'user', class: '' },
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  { path: '/application-flow', title: 'Application Flow', icon: 'user', class: '' },


  { path: '/programs/marketing-collateral', title: 'Marketing-Collateral', icon: 'user', class: '' },
  { path: '/programs/details-program', title: 'Program', icon: 'user', class: '' },
  { path: '/programs/add-program', title: 'New Program', icon: 'user', class: '' },
  { path: '/programs/edit-program', title: 'Edit Program', icon: 'user', class: '' },
  { path: '/programs', title: 'Programs', icon: 'user', class: '' },

  { path: '/institutions/campus', title: 'Campus', icon: 'user', class: '' },
  { path: '/institutions/bulkupdate', title: 'Program Bulk Update', icon: 'user', class: '' },
  { path: '/bulkupdate', title: 'Program Bulk Update', icon: 'user', class: '' },
  { path: '/institutions/region-of-marketing', title: 'Region of Marketing', icon: 'user', class: '' },
  { path: '/institutions/disciplines', title: 'Disciplines', icon: 'user', class: '' },
  { path: '/institutions/intake', title: 'Intake', icon: 'user', class: '' },
  { path: '/institutions/marketing-collateral', title: 'Marketing Collateral', icon: 'user', class: '' },
  { path: '/institutions/events-update', title: 'Events/Updates', icon: 'user', class: '' },
  { path: '/institutions/team', title: 'Team', icon: 'user', class: '' },
  { path: '/institutions/agent', title: 'Agent', icon: 'user', class: '' },

  { path: '/institutions/marketing-collateral', title: 'Marketing-Collateral', icon: 'institutions', class: '' },
  { path: '/institutions/add-institutions', title: 'Add Institution', icon: 'institutions', class: '' },
  { path: '/institutions/edit-institutions', title: 'Edit Institution', icon: 'institutions', class: '' },
  { path: '/institutions/institutions-details', title: 'Institution Detail', icon: 'institutions', class: '' },
  { path: '/institutions', title: 'Institutions', icon: 'institutions', class: '' },

  { path: '/users/add-user', title: 'Add User', icon: 'user', class: '' },
  { path: '/users/edit-user', title: 'Edit User', icon: 'user', class: '' },
  { path: '/users', title: 'Users', icon: 'user', class: '' },
  { path: '/assigned-agent', title: 'Assign Agent', icon: 'user', class: '' },

  { path: '/campaigns/add', title: 'Add Campaign', icon: 'user', class: '' },
  { path: '/campaigns/edit', title: 'Edit Campaign', icon: 'user', class: '' },
  { path: '/campaigns', title: 'Campaigns', icon: 'user', class: '' },

  { path: '/leads/add', title: 'Add lead', icon: 'user', class: '' },
  { path: '/leads/edit', title: 'Edit lead', icon: 'user', class: '' },
  { path: '/leads', title: 'Leads', icon: 'user', class: '' },
  { path: '/studentsfollowup', title: 'Student Followup', icon: 'user', class: '' },
  { path: '/opportunities', title: 'Opportunities', icon: 'user', class: '' },
  { path: '/events', title: 'Events', icon: 'user', class: '' },  
  { path: '/activity', title: 'Activity', icon: 'user', class: '' },
  { path: '/students/show-students', title: 'Students', icon: 'user', class: '' },
  { path: '/students/add-student', title: 'New Student', icon: 'user', class: '' },
  { path: '/students/edit-student', title: 'Edit Student', icon: 'user', class: '' },
  { path: '/students', title: 'Students', icon: 'user', class: '' },

  { path: '/eligibility/check', title: 'Check Eligibility', icon: 'user', class: '' },
  { path: '/eligibility/show', title: 'Eligibel Programs', icon: 'user', class: '' },
  { path: '/eligibility', title: 'Eligibility Test', icon: 'user', class: '' },

  { path: '/program-search', title: 'Program Search', icon: 'user', class: '' },

  { path: '/application-for-institution/edit-application', title: 'Agent Evaluation Form', icon: 'user', class: '' },
  { path: '/application-for-institution/add-application', title: 'Agent Evaluation Form', icon: 'user', class: '' },


  { path: '/retrieve/application', title: 'Retrieve Deleted Application', icon: 'user', class: '' },

  { path: '/application/new', title: 'New Application', icon: 'user', class: '' },
  { path: '/application/apply', title: 'New Application', icon: 'user', class: '' },
  { path: '/application/view', title: 'Application', icon: 'user', class: '' },
  { path: '/application/history', title: 'Application History', icon: 'user', class: '' },
  { path: '/application', title: 'Applications', icon: 'user', class: '' },

  { path: '/agent-commission', title: 'Commission', icon: 'user', class: '' },
  { path: '/commission', title: 'Commission', icon: 'user', class: '' },

  { path: '/agents/show-agents', title: 'Agents', icon: 'user', class: '' },
  { path: '/agents/add-agent', title: 'New Agent', icon: 'user', class: '' },
  { path: '/agents/edit-agent', title: 'Edit Agent', icon: 'user', class: '' },
  { path: '/agents', title: 'Agents', icon: 'user', class: '' },

  { path: '/passport-expiry', title: 'Passport Expiry', icon: 'user', class: '' },
  { path: '/mobility', title: 'Mobility', icon: 'user', class: '' },

  { path: '/new-application', title: 'New Applications', icon: 'user', class: '' },
  { path: '/deferred-application', title: 'Deferred Applications', icon: 'user', class: '' },
  { path: '/arrival-application', title: 'Arrival Applications', icon: 'user', class: '' },
  { path: '/useractivity', title: 'User Activity', icon: 'user', class: '' },
  { path: '/daily-sales', title: 'Daily Sales', icon: 'user', class: '' },
  { path: '/aef-data', title: 'AEF Data', icon: 'user', class: '' },
  { path: '/programwise', title: 'Program Wise', icon: 'user', class: '' },
  { path: '/refundtracker', title: 'Refund Tracker', icon: 'user', class: '' },
  { path: '/agentinvoicetracker', title: 'Agent Invoice Tracker', icon: 'user', class: '' },

  { path: '/growth-analysis', title: 'Growth Analysis', icon: 'user', class: '' },
  { path: '/student-analysis', title: 'Student Analysis', icon: 'user', class: '' },
  { path: '/daily-sales-with-revenue', title: 'Daily Sales With Revenue', icon: 'user', class: '' },
  { path: '/agent-refund-tracker', title: 'Refund Tracker', icon: 'user', class: '' },
  { path: '/conversion-ratio', title: 'Conversion Ratio', icon: 'user', class: '' },
  { path: '/commission-tracker', title: 'Commission Tracker', icon: 'user', class: '' },

  { path: '/invoice/map-commission', title: 'Map Commission', icon: 'user', class: '' },
  { path: '/invoice/generate-invoice', title: 'Generate Invoice', icon: 'user', class: '' },
  { path: '/invoice', title: 'Invoices', icon: 'user', class: '' },

  { path: '/partner-type', title: 'Partner Type', icon: 'user', class: '' },
  { path: '/agent-document', title: 'Agent Document', icon: 'user', class: '' },

  { path: '/role/show', title: 'Roles', icon: 'user', class: '' },
  { path: '/role/permission', title: 'Role Permission', icon: 'user', class: '' },
  { path: '/role', title: 'Role', icon: 'user', class: '' },

  { path: '/profile', title: 'Profile', icon: 'user', class: '' },

  { path: '/change-password', title: 'Change Password', icon: 'user', class: '' },
  { path: '/mytodo', title: 'My Task List', icon: 'user', class: '' },

  { path: '/news', title: 'News & Updates', icon: 'user', class: '' },

  { path: '/fee-waiver', title: 'Fee Waivers', icon: 'user', class: '' },
  { path: '/notification', title: 'Notifications', icon: 'user', class: '' },
  { path: '/feedback', title: 'Feedbacks', icon: 'user', class: '' },
  { path: '/import-batch', title: 'Import Batch', icon: 'user', class: '' },

  { path: '/ticketing-sys', title: 'Ticketing System', icon: 'user', class: '' },
  { path: '/user-task', title: 'User Tasks', icon: 'user', class: '' },
  { path: '/evaluationform', title: 'Evaluation Form', icon: 'user', class: '' },
  { path: '/knowledge-centre', title: 'Knowledge Base', icon: 'user', class: '' },

  { path: '/knowledgecentre', title: 'Knowledge Center', icon: 'user', class: '' },
  { path: '/agentintakewisesummary', title: 'Agent Intakewise Summary', icon: 'user', class: '' },
  { path: '/institutecountrywisesummary', title: 'Institution Countrywise Summary', icon: 'user', class: '' },
  { path: '/instituteintakewisesummary', title: 'Institution Intakewise Summary', icon: 'user', class: '' },
  { path: '/agentinstitutionintakewisesummary', title: ' Agent Institution Intakewise Summary', icon: 'user', class: '' },
  { path: '/agentinstituteintakewiseperformance', title: ' Agent Intakewise Performance', icon: 'user', class: '' },
  { path: '/instituteagentgrowth', title: 'Institution Agent Growth', icon: 'user', class: '' },
  { path: '/institutetoptenprogram', title: 'Institution Top Program', icon: 'user', class: '' },
  { path: '/pendingofferlettercanada', title: 'Pending Offer Letter Canada', icon: 'user', class: '' },
  { path: '/pendingofferletteruk', title: 'Pending Offer Letter UK', icon: 'user', class: '' },
  { path: '/summaryofrefund', title: ' Summary Of Refund', icon: 'user', class: '' },
  { path: '/salesreportcanada', title: 'Sales Report Canada', icon: 'user', class: '' },
  { path: '/salesreportusa', title: ' Sales Report USA', icon: 'user', class: '' },
  { path: '/salesreportuk', title: 'Sales Report UK', icon: 'user', class: '' },
  { path: '/salesreporthungary', title: ' Sales Report Hungary', icon: 'user', class: '' },
  { path: '/aefmissingdata', title: ' AEF Missing', icon: 'user', class: '' },
  { path: '/agent-activity', title: ' Agent Activity', icon: 'user', class: '' },
  { path: '/agent-zone-wise', title: 'Agent Zone Wise', icon: 'user', class: '' },
  { path: '/marketingactivity', title: 'Marketing Activity', icon: 'user', class: '' },
  { path: '/toptenagentperformance', title: 'Top Ten Agent Performance', icon: 'user', class: '' },
  { path: '/statewiseprogramwisesummary', title: 'State Wise Program Wise Summary', icon: 'user', class: '' },

  { path: '/weekly-dashboard', title: 'KPI Dashboard', icon: 'user', class: '' },

  { path: '/refund', title: 'Refund', icon: 'user', class: '' },

  { path: '/kpi/comparison-dashboard', title: 'KPI Comparison Dashboard', icon: 'user', class: '' },

  { path: '/mydocument', title: 'My Documents', icon: 'user', class: '' },
  { path: '/marketing-report/master', title: 'Marketing Master', icon: 'user', class: '' },
  { path: '/calling', title: 'Agent Calling', icon: 'user', class: '' },
  { path: '/commission-report', title: 'Commission', icon: 'user', class: '' },
  { path: '/user-notification', title: 'Notifications', icon: 'user', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: any[];

  @Input()
  currentUser: Login;
  // @Input()
  menu: any[];

  filepath = environment.filepath;
  instLogo: string;

  ps: any;
  documentList: any[];
  showBecomePartnerBtn = true;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private instService: InstituteService,
    private matDialog: MatDialog,
    private screenShotService: ScreenshotService,
    private menuService: MenuService,
    private toasterService: ToasterService,
    private studentDocumentService: StudentDocumentService,
    private miscService: MiscService,
    private onDocumentUploadService: OnDocumentUploadService,
    private commonService : CommonService) {

  }

  ngOnInit() {
    this.onDocumentUploadService.businessCertificate.pipe(takeUntil(this.onDestroy$)).subscribe(n => {
      this.showBecomePartnerBtn = n
    });

    if (this.currentUser.BusinessCertFound) {
      this.showBecomePartnerBtn = false;
    }

    if (this.currentUser.RoleType === 2) {
      this.instService.getLogo(this.currentUser.RefId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.instLogo = res;
        });
    }

    this.miscService.document(parentType.Agent).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.documentList = res;
    });

    this.menuService.getMenu().pipe(takeUntil(this.onDestroy$)).subscribe(data => { this.menu = data; });
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      this.ps = new PerfectScrollbar(elemSidebar);
      this.ps.update();
    }
  }

  public ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  openFeedback() {
    html2canvas(document.querySelector('#screenshot'), { scrollY: window.scrollY }).then(canvas => {
      const canvasdata = canvas.toDataURL('image/png');
      this.screenShotService.outPutsubj({ name: canvasdata });
    });

    this.matDialog.open(FeedbackComponent, { width: '50%', minWidth: '400px' }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.screenShotService.outPutsubj(null);
      });
  }

  becomePartner() {

    this.matDialog.open(UploadDocumentsComponent, { data: { uploaddir: 'agent', documentList: this.documentList, DocumentTypeId: 15 } })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.studentDocumentService.add({
            ParentId: this.currentUser.RefId,
            ParentType: parentType.Agent,
            DocPath: res.DocPath,
            DocumentTypeId: 15,
          }).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop('success', 'Document saved successfully');
            if (res > 0) {
                      this.commonService.BusinessStatus.next(true); 
                          this.showBecomePartnerBtn = false; }
          });
        }
      });
  }

}
