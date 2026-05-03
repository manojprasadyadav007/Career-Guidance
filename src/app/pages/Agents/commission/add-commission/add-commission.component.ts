import { Component, OnInit, Inject, OnDestroy, HostListener } from '@angular/core';
import { AgentCommissionService } from 'app/services/agent-commission.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { editorlist } from 'app/models/site-map.model';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InstituteService } from 'app/services/institute.service';
import { MSMAgentService } from 'app/services/msmagent.service';
import { MiscService } from 'app/services/misc.service';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';

@Component({
  selector: 'app-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.scss']
})
export class AddCommissionComponent implements OnInit, OnDestroy {

  agentId: number = 0;
  commissionId: number = 0;
  formdata: any = {
    AgentId: null,
    InstitutionId: null,
    CommissionType: null,
    MethodType: null,
    NoOfSemester: null,
    IsMaximumLimit: null,
    MaximumAmount: null,
    CommissionPer: null,
    Currency: null,
    isNoOfStImpact: null,
    ImpactBase: null,
    ImpactFromDate: null,
    ImpactToDate: null,
    CommissionTerms: '',
    slabList: []
  };
  isAdd: boolean = false;
  closeAfterAdd: boolean = false;
  institutionList: any[];
  programList: any[];
  intakeList: any[];
  regionList: any[];
  instFilter: any = '';
  regionFilter: any = '';
  agentFilter: any = '';
  prgFilter: any = '';
  intakeFilter: any = '';

  flagdisabled: boolean = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  popupVisible: boolean;
  btnLabel: string = "Add";
  currentUser: Login;
  fieldsdisabled: boolean;
  permission: number = 0;
  items: any = Object.assign([], editorlist);
  agentList;

  methodLabel: string = 'semesters/courses/credits';
  cnyFilter: string = '';
  currencyList: string[];
  slabData: any = {};

  constructor(private agentCommissionService: AgentCommissionService,
    private dialogRef: MatDialogRef<AddCommissionComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private matDialog: MatDialog,
    authservice: AuthenticationService,
    private programIntakeService: ProgramIntekService,
    private instservice: InstituteService,
    private msmsAgentService: MSMAgentService,
    private miscService: MiscService,
    private mandatoryFieldService:MandatoryfieldCheckService
  ) {
    this.items.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
    })
    this.currentUser = authservice.currentUserSubject.getValue();
    this.fieldsdisabled = this.currentUser.RoleId === 2 ? true : false;
    this.agentId = data.agentId;
    this.commissionId = data.CommissionId;

    this.permission = data.permission | 0;

    if (data.closeAfterAdd === undefined) {
      this.closeAfterAdd = true;
    }
    else {
      this.closeAfterAdd = data.closeAfterAdd;
    }
  }

  ngOnInit() {

    this.resetForm();
    this.fillInstitutionList();
    this.fillCurrency();
    if (this.commissionId > 0) {
      this.get();
    } else if (this.currentUser.RoleType === 2) {
      this.onChangeInstitution();
    }
  }

  resetForm() {
    this.formdata = {
      CommissionId: 0,
      InstitutionId: null,
      RegionId: null,
      ProgramId: null,
      IntakeId: null,
      CommissionType: null,
      CommissionPer: null,
      SemesterNos: [],
      AgentId: this.agentId,
      CommissionTerms: '',
    };
    if (this.currentUser.RoleType === 2) {
      this.formdata.InstitutionId = this.currentUser.RefId;
    }

  }



  onSubmit(form: NgForm, isChecked?: boolean) {
    var pop_value = false;
    if(!isChecked && form.valid && this.slabData.SlabStart && this.slabData.SlabEnd && this.slabData.CommRate){
      pop_value = true;
      this.matDialog.open(ConfirmBoxComponent, {data:{title:'MSM',content:' Commission slab you filled but forget to add, do you want to continue?',icon:'info',yesLabel:'Yes',noLabel:'No'}}).afterClosed().pipe(takeUntil(this.onDestroy$))
      .subscribe(res => {
        if (res) {
          this.onSubmit(form, true);
        }
      });
    }else{
      pop_value = false;
    }

    if(pop_value){
      return;
    }

    if (form.invalid) {
      this.mandatoryFieldService.setinvalidFields();
      console.log(form);
      return;
    }

    if (this.formdata.MethodType == 1) {
      this.formdata.IsMaximumLimit = false;
    }

    if (!this.formdata.IsMaximumLimit ) {
      this.formdata.MaximumAmount = null;
    }
    if (!this.formdata.isNoOfStImpact) {
      this.formdata.ImpactBase = null;
      this.formdata.ImpactFromDate = null;
      this.formdata.ImpactToDate = null;
      this.formdata.slabList = [];
    }
    if (this.formdata.ImpactBase != 0) {
      this.formdata.ImpactFromDate = null;
      this.formdata.ImpactToDate = null;
    }

    // In case of Institution login, we are not showing the Institution ddl, so we are setting the value directly in the model
    if (this.currentUser.RoleType === 2) {
      this.formdata.InstitutionId = this.currentUser.RefId
    }

    this.flagdisabled = true;
    if (this.commissionId > 0) {
      this.agentCommissionService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.isAdd = true;
        if (this.closeAfterAdd) {
          this.close();
        }
        else {
          this.flagdisabled = false;
          this.resetForm();
        }
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {
      this.agentCommissionService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.isAdd = true;
        if (this.closeAfterAdd) {
          this.close();
        }
        else {
          this.flagdisabled = false;
          this.resetForm();
        }
      }, err => {
        this.flagdisabled = false;
      });
    }


  }

  close() {
    this.dialogRef.close(this.isAdd);
  }

  fillInstitutionList() {
    if (this.currentUser.RoleType != 2) {
      this.instservice.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => { this.institutionList = res; });
    }
  }

  get() {
    // if (!this.commissionId) {
    //  return;
    // }

    this.agentCommissionService.get(this.commissionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formdata = res;

      this.onChangeInstitution();
      this.onChangeRegion();
      this.onChangeProgram();
      this.setMethodLabel();

      this.btnLabel = "Update";
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onChangeInstitution(reset?: boolean) {
    if (reset) {
      this.formdata.RegionId = null;
      this.formdata.ProgramId = null;
      this.formdata.IntakeId = null;

    }
    this.regionList = [];
    this.programList = [];
    this.intakeList = [];
    // if (this.formdata.InstitutionId) {
    //   // this.instCountryService.list(this.formdata.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => { this.regionList = res });
    // }

    if (this.formdata.InstitutionId) {
      var partnerTypeId = 0;
      if (this.currentUser.RoleType === 2) {
        partnerTypeId = this.currentUser.PartnerTypeId;
      } else {

        if (this.institutionList) {
          var index = this.institutionList.findIndex(d => d.InstitutionId === this.formdata.InstitutionId);
          if (index >= 0) {
            partnerTypeId = this.institutionList[index].PartnerTypeId;
          }
        }

      }
      this.msmsAgentService.forDDLByPartnerType(partnerTypeId === 1 ? 1 : 0).pipe(takeUntil(this.onDestroy$)).subscribe(res => { this.agentList = res });
    }


  }

  onChangeRegion(reset?: boolean) {
    if (reset) {
      this.formdata.ProgramId = null;
      this.formdata.IntakeId = null;
    }

    this.programList = [];
    this.intakeList = [];

    // this.programService.forDDLByAgentAndCountry(this.formdata.InstitutionId, this.agentId, this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    //   this.programList = res;
    // });
  }

  onChangeProgram(reset?: boolean) {
    if (reset) {
      this.formdata.IntakeId = null;
    }

    this.intakeList = [];

    if (this.formdata.ProgramId > 0) {
      this.programIntakeService.forDDLByAgentAndCountry(this.formdata.ProgramId, this.agentId, this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.intakeList = res;
      });
    }


  }


  setMethodLabel() {
    if (this.formdata.CommissionType === 0) {
      this.methodLabel = 'semesters';
    }
    else if (this.formdata.CommissionType === 1) {
      this.methodLabel = 'courses';
    }
    else if (this.formdata.CommissionType === 2) {
      this.methodLabel = 'credits';
    }
    else {
      this.methodLabel = 'semesters/courses/credits';
    }
  }

  fillCurrency() {
    this.miscService.currency().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.currencyList = res;
    });
  }

  addSlab(form: NgForm) {
    if (form.valid) {
      if (!this.formdata.slabList) {
        this.formdata.slabList = [];
      }
      this.formdata.slabList.push(Object.assign({}, this.slabData));
      this.slabData = {};
      form.resetForm();
    }
  }

  removeSlab(index) {
    this.formdata.slabList.splice(index,1);
  }


}
