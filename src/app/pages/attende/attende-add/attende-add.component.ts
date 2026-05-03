import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { AttendeService } from 'app/services/attende.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-attende-add',
  templateUrl: './attende-add.component.html',
  styleUrls: ['./attende-add.component.scss']
})
export class AttendeAddComponent implements OnInit , OnDestroy {

  userList:any[];
  formdata:any={
    ParentId:null,
    ParentType:null,
    AttendeType:null,
    AttendeUserId:null
  }
  flagdisabled: boolean = false;
  title:string='Add';
  attendFilter:any='';
  InstitutionId:number=0;
  RegionId:number=0;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private userService:UserService,
    private attendeService:AttendeService,
    private matDialogRef:MatDialogRef<AttendeAddComponent>,
    @Inject(MAT_DIALOG_DATA) data
    ) { 

      this.formdata.ParentId = +data.ParentId;
      this.formdata.ParentType = +data.ParentType;
      this.formdata.AttendeType = +data.AttendeType;
      
      this.title = data.title;

      if(data.InstitutionId)
      {
        this.InstitutionId=data.InstitutionId;
      }

      if(data.RegionId)
      {
        this.RegionId=data.RegionId;
      }

    }

  ngOnInit() {
    var rolesIn ='';
    var rolesNotIn='';

    if(this.formdata.AttendeType===1)
    {
       rolesIn='2,3';
       this.title='Attendee';
    }
    else if(this.formdata.AttendeType===2)
    {
      rolesNotIn='2,3,4';
      this.title='Participant';
    }
    else
    {
      rolesNotIn='2,4';
      this.title='Assignee';
    }

    this.userService.forDDL(rolesIn,rolesNotIn,this.InstitutionId,this.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.userList=res;
    })
  }

  add(form:NgForm)
  {
    if(form.invalid)
    {
        return;
    }
    this.flagdisabled = true;
    this.attendeService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.flagdisabled =false;
       this.matDialogRef.close(true);
    },err =>{
      this.flagdisabled = false;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
