import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from 'app/services/role.service';
import { enumToArray, RoleTypes } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { appPattern } from "app/models/site-map.model";
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { PartnerTypeService } from 'app/services/partnerTypesService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-partner-type',
  templateUrl: './add-partner-type.component.html',
  styleUrls: ['./add-partner-type.component.scss']
})
export class AddPartnerTypeComponent implements OnInit, OnDestroy  {

  roleTypes=enumToArray(RoleTypes);
  btnLable:string='Add';
  formdata:any;
  flagdisable:boolean =false;
  typeFilter:any='';

  modelPattern = appPattern;

  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private matDialogRef:MatDialogRef<AddPartnerTypeComponent>,
    private roleService:PartnerTypeService,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
        this.formdata = data;
        if(this.formdata.PartnerTypeId>0)
        {
           this.btnLable = "Update";
        }
     }

  ngOnInit() {
  }

  onSubmit()
  {
    this.flagdisable =true;
    if(this.formdata.PartnerTypeId===0)
    {
      this.roleService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res){
          this.toasterService.pop('success','Partner type saved successfully');
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
          this.toasterService.pop('success', 'Partner type updated successfully');
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
