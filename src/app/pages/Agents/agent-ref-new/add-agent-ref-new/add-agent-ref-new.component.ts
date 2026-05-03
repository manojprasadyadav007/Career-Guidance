import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { appPattern } from 'app/models/site-map.model';
import { AgentRefService } from 'app/services/agent-ref.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { StudentDocumentService } from 'app/services/student-document.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-add-agent-ref-new',
  templateUrl: './add-agent-ref-new.component.html',
  styleUrls: ['./add-agent-ref-new.component.scss']
})
export class AddAgentRefNewComponent implements OnInit, OnDestroy {

  agentId: number = 0;
  formdata: any;
  permission: number = 0;
  modelPattern=appPattern;
  refId:number=0;
  flagdisabled:boolean =false;
  docList: any[] = [];

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private agentRefService: AgentRefService,
    private dialogRef: MatDialogRef<AddAgentRefNewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.agentId = data.agentId;
    this.refId = data.refId | 0;
    this.permission = data.permission;
    // if(data.agentRef)
    // {
    //   this.formdata = data.agentRef;
    // }
  }

  ngOnInit() {
    if(!this.formdata)
    {
      this.resetForm();
    }
  }

  resetForm() {
    this.formdata = {
      RefId: 0,
      Name: '',
      Designation: '',
      Email: '',
      PhoneNo: '',
      Institution: '',
      Remark:'',
      AgentId: this.agentId,
      RefAddress : '',
      RefResponse : ''
    };

    if (this.refId > 0) {
      this.agentRefService.get(this.refId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
      });
    }
  }


  getArray($event) {
    this.docList = $event;
  }
  onSubmit(form:NgForm) {

    if(form.invalid)
    {
      return;
    }

    this.flagdisabled = true;
      if (this.formdata.RefId > 0) {
        this.agentRefService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.dialogRef.close(res);
        }, err =>{
          this.flagdisabled =false;
        });
      }
      else {
        this.agentRefService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.dialogRef.close(res);
        },err =>{
          this.flagdisabled = false;
        });
      }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
