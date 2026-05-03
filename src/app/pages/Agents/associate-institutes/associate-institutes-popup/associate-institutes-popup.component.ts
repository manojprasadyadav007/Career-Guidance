import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InstituteService } from 'app/services/institute.service';
import { AgentWorkingInstService } from 'app/services/agent-workingInst.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-associate-institutes-popup',
  templateUrl: './associate-institutes-popup.component.html',
  styleUrls: ['./associate-institutes-popup.component.scss']
})
export class AssociateInstitutesPopupComponent implements OnInit, OnDestroy {

  agentId: number;
  institutionList: any[];
  formdata: any = { InstitutionId: 0 };
  messageTitle: string = 'Institution';
  private onDestroy$: Subject<void> = new Subject<void>();
  instFilter:string='';

  constructor(
    private dialogref: MatDialogRef<AssociateInstitutesPopupComponent>, private agentWorkingInstService: AgentWorkingInstService,
    @Inject(MAT_DIALOG_DATA) data, private tosterService: ToasterService, private institutionService: InstituteService
  ) {
    this.agentId = data.agentId;
  }

  ngOnInit() {
    this.fillInstitutionList();
  }

  // get dropdown data 
  fillInstitutionList() {
    this.institutionService.forAgentEvolutionForm(this.agentId, 0)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.institutionList = res;
      });
  }

  addAssociateInstitute() {
    let params = { InstitutionId: this.formdata.InstitutionId, AgentId: this.agentId }
    this.agentWorkingInstService.add(params)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.tosterService.pop('success', 'Institution saved successfully');
          this.dialogref.close({ status:'success'});
        }
      });
  }

  cancel() {
    this.dialogref.close();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
