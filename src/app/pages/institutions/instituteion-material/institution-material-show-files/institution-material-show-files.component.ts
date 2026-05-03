import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { InstituteMaterialService } from 'app/services/institute-material.service';
import { Login } from 'app/models/login.model';
import { environment } from 'environments/environment';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-institution-material-show-files',
  templateUrl: './institution-material-show-files.component.html',
  styleUrls: ['./institution-material-show-files.component.scss']
})
export class InstitutionMaterialShowFilesComponent implements OnInit {

  @Input()
  institutionId: number = 0;

  @Input()
  parentName: '';

  filepath:string=environment.filepath ;

  permission:number;

  isPage:boolean;

  currentUser: Login;
  @Input()
  showCard:boolean=true;

  dataList:any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  fileItems: any;


  constructor(private instMaterialService: InstituteMaterialService, private  authService:AuthenticationService, private activateRoute:ActivatedRoute,
    private toasterService: ToasterService, private activityLog: ActivityLogService) { 
      this.currentUser = this.authService.currentUserSubject.getValue();
    }

  ngOnInit() {
    if(this.currentUser.RoleType === 2) {
      this.institutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Marketing_Collateral);
    }
    else
    {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
      this.activateRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res.get('id'))
        {
          this.institutionId = +res.get('id');
          this.isPage=true;
        }
     });
    }
    if(this.permission<1)
    {
      return;
    }
    if (this.institutionId > 0) {
      this.list();
    }
  }

  list() {
    this.instMaterialService.listOfFile(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
       this.fileItems = res;
       console.log(this.fileItems);
    });
  }

  menuAction(e: any) {
    const isDirectory = e.fileSystemItem.dataItem.isDirectory;
    if (!isDirectory) {
      window.open(this.filepath + 'Institution/' + e.fileSystemItem.dataItem.downloadUrl);
    } else {
      alert('You can only download file');
    }
  }

  // Called after double click on a file (not directory)
  openFile(e: any) {
    window.open(this.filepath + 'institution/' + e.file.dataItem.downloadUrl);
  }

}
