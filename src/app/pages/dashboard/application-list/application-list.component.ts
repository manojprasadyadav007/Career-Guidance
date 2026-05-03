import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ApplicationService } from 'app/services/application.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Login } from 'app/models/login.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit, OnDestroy {
  data: any;
  currentUser: Login;
  permission: number = 0;
  gridMessage='No Data';
  showFilterRow:boolean=false;
  excel_permisson:number=0;
  columns:any[]=[ 
    { title:"Status",data:"StatusName",type:"",format:""},
    { title:"Intake",data:"IntakeName",type:"",format:""},
    { title:"Program",data:"ProgramName",type:"",format:""},
    { title:"Institution",data:"InstName",type:"",format:""},
      ];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private applicationService: ApplicationService,
    private authService: AuthenticationService,
    private router: Router) {
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.permission = this.authService.checkPermission(sitemap.Applications);
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
     }
 

  ngOnInit() {
    this.list();
  }

  list() {
    this.gridMessage='Loading...';
    this.applicationService.listDetailed('Last Modified','','').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.data = res; 
      this.gridMessage='No Data';
    });
  }

  add() {
    if(this.currentUser.RoleId===3)
    {
      this.router.navigate(['/member/application/new']);
      return;
    }
  }
  
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'advanceButtonTemp'
  });
  }
  

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  
}
