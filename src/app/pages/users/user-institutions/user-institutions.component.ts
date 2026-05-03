import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { UserInstitutionService } from 'app/services/user-institution.service';
import { AddUserInstitutionsComponent } from './add-user-institutions/add-user-institutions.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
@Component({
  selector: 'app-user-institutions',
  templateUrl: './user-institutions.component.html',
  styleUrls: ['./user-institutions.component.scss']
})
export class UserInstitutionsComponent implements OnInit  , OnDestroy{

  // institutionList:MatTableDataSource<any>;

  //columnToDisplay: string[] = ["Institution", 'Region', 'Zone', 'Action'];
  gridMessage: string = 'No data';
  @Input()
  UserId:number=0;

  @Input()
  permission:number=0;

  @Input()
  roleType:number=0;
  dataList:any[];

//visible:this.roleType !=2
  columns:any[];

    showFilterRow:boolean=false;
    private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private userInstService:UserInstitutionService,
    private matDialog:MatDialog , authService : AuthenticationService,) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
    if(this.roleType != 2)
    this.columns=[
      { dataField:'InstName', title:'Institution', type:'', format:'' },
      { dataField:'CountryName', title:'Region', type:'', format:'' },
      { dataField:'Zone', title:'Zone', type:'' , format:'' },
    ];
    else{
      this.columns=[
        { dataField:'InstName', title:'Institution', type:'', format:'' },
      ];
  
    }

    this.list();
  }

  list()
  {
    this.gridMessage = 'Loading';
      this.userInstService.list(this.UserId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
         this.dataList = res;
         this.gridMessage = 'No data';

          //  this.institutionList = new MatTableDataSource(res);
          //  this.institutionList.paginator = this.paginator;
      });
  }

  delete(AssignId:number)
  {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if(res){
      this.userInstService.delete(AssignId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
         this.list();
      });
    }
  });
  }

  edit(AssignId:number)
  {
     this.matDialog.open(AddUserInstitutionsComponent,{data:{AssignId:AssignId,UserId:this.UserId,roleType:this.roleType},width:'80%'}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
       if(res)
       {
         this.list();
       }
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
}
