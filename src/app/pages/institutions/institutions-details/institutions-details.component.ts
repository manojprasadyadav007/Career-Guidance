import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstituteService } from 'app/services/institute.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ProgramService } from 'app/services/program.service';
import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-institutions-details',
  templateUrl: './institutions-details.component.html',
  styleUrls: ['./institutions-details.component.scss']
})
export class InstitutionsDetailsComponent implements OnInit , OnDestroy{

  columnToDisplay: string[] = ['ProgramName', 'Duration', 'ApplicationFee', 'TutionFee', 'ProgramStatus', 'Action'];
  programList: MatTableDataSource<any>;
  filepath:string=environment.filepath+'institution/';
  id: number;
  instData:any;
  parentRoute:string="";
  currentUser:Login;
  permission:number;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private instService: InstituteService
    ,private programService:ProgramService
    , private route: ActivatedRoute
    , private router: Router,
    private authService:AuthenticationService ) { }

  ngOnInit() {
    this.currentUser=this.authService.currentUserSubject.getValue();
    this.permission = this.authService.checkPermission(sitemap.Institutions);
  
    if(this.currentUser.UserId>0)
    {
        this.parentRoute="member/";
    }
    
    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.id = +param.get("id") | 0;
      this.getBasicDetail();
      this.getPrograms();
    });
  }

  getBasicDetail() {
      this.instService.getDetail(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.instData=res;
      });
  }

  getPrograms() {
    this.programService.list(this.id,'').pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.programList = new MatTableDataSource(res);
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
