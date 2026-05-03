import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from 'app/services/role.service';
import { enumToArray, RoleTypes } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { appPattern } from "app/models/site-map.model";
import { ToasterService } from 'angular2-toaster/src/toaster.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit , OnDestroy {

  roleTypes=enumToArray(RoleTypes);
  btnLable:string='Add';
  formdata:any;
  flagdisable:boolean =false;
  typeFilter:any='';

  modelPattern = appPattern;

  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private matDialogRef:MatDialogRef<AddRoleComponent>,
    private roleService:RoleService,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
        this.formdata = data;
        if(this.formdata.RoleId>0)
        {
           this.btnLable = "Update";
        }
     }

  ngOnInit() {
  }

  onSubmit()
  {
    this.flagdisable =true;
    if(this.formdata.RoleId===0)
    {
      this.roleService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res){
          this.toasterService.pop('success','Role saved successfully');
        this.matDialogRef.close(true);
         }
      },err =>{
        this.flagdisable =false;
      });
    }
    else
    {
      this.roleService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res){
          this.toasterService.pop('success','Role updated successfully');
        this.matDialogRef.close(true);
        }
      },err =>{
        this.flagdisable =false;
      });
    }
      
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
