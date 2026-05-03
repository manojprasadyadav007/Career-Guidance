import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { appPattern } from 'app/models/site-map.model';
import { AgentBranchService } from 'app/services/agent-branch.service';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit, OnDestroy {
  formdata: any;
  agentId;
  branchId;
  countyFilter: any = '';
  btnLabel: String = 'Add';
  flagdisabled: boolean;
  modelPattern = appPattern;
  primContProvinceFilter:any='';
  private onDestroy$: Subject<void> = new Subject<void>();
  countryList: any;
  provinceList: any;
  // dataList: any;
  // onDestroy$: any;
  constructor(private agentBranchService: AgentBranchService,
    private miscService: MiscService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<AddBranchComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.agentId = data.agentId;
    this.branchId = data.branchId
  }

  ngOnInit() {
    this.resetForm();
    this.fillCountry();
    if (this.branchId > 1) {
      this.getSingleBranchData(this.branchId)
    }
  }

  resetForm() {
    this.formdata = {
      AgentId: this.agentId,
      BranchName: '',
      ProvinceId: null,
      CountryId: null,
      City: '',
      BranchAddress: '',
      BranchEmail: '',
      BranchPhone: '',
      ContactPersonName: '',
      ContactPersonPhone: '',
      ContactPersonEmailId: ''
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.branchId) {
      this.flagdisabled = true;
      this.agentBranchService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Branch updated successfully');
        this.dialogRef.close(true);
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {
     
      this.flagdisabled = true;
      this.agentBranchService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Branch saved successfully');
        this.dialogRef.close(true);
      }, err => {
        this.flagdisabled = false;
      });
    }
  }

  fillCountry() {
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
      });
  }

  fillProvince(countryId,reset?:boolean) {
    if(reset){ this.formdata.ProvinceId=null }
    if (!countryId) { return; }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceList = res;
      });
  }
  getSingleBranchData(branchId) {
    this.agentBranchService.get(branchId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.btnLabel = 'Update';
      this.fillProvince(res.CountryId,false)
      this.formdata = res;
      // this.dataList = res;

    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
