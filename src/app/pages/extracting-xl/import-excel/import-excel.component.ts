import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import * as XLSX from 'xlsx';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InstituteService } from 'app/services/institute.service';
import { BatchService } from 'app/services/batch.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss'],
  //encapsulation : ViewEncapsulation.None,

})
export class ImportExcelComponent implements OnInit {

  formdata: any = {
    InstitutionId: null,
    StudentId: null,
    FirstName: null,
    MiddleName: null,
    LastName: null,
    Program: null,
    Intake: null,
    AgentName: null,
    FeeAmount: null,
    CommissionAmount: null
  };
  sizeerror: any = undefined;

  flagDisabled: boolean = false;
  filepath=environment.apiurl;
  invalidFileExtension = false;
  columnsListOption: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();


  instList: any[];

  instFilter: string = '';
  studentIDFilter: string = '';
  firstNameFilter: string = '';
  lastNameFilter: string = '';
  middleNameFilter: string = '';
  programFilter: string = '';
  intakeFilter: string = '';
  agentNameFilter: string = '';
  feeAmountFilter: string = '';
  commissionAmountFilter: string = '';

  loadingFile: boolean = false;

  sheetNames: string[];
  wb: XLSX.WorkBook = null;
  currentSheet: string;
  sheetFilter: string = '';

  constructor(
    private toasterService: ToasterService,
    private router: Router,
    private instService: InstituteService,
    private batchService: BatchService) { }

  ngOnInit() {
    this.listInstitution();
  }

  fileChange(evt) {
    this.currentSheet = null;
    this.sizeerror =undefined;
    this.columnsListOption = [];
    this.sheetNames = [];
    this.resetFormData();
    this.wb = null;
    try {
      this.invalidFileExtension = false
      let ext = evt.target.files[0] ? evt.target.files[0].name.match(/\.([^\.]+)$/)[1] : '';

      if (!(ext === 'xlsx' || ext === 'csv')) {
        this.invalidFileExtension = true
        return false;
      }

      this.loadingFile = true;
      const target: DataTransfer = <DataTransfer>(evt.target);

      if (target.files.length !== 1) throw new Error('Cannot use multiple files');

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        this.wb = XLSX.read(e.target.result, { type: 'binary' });
        this.sheetNames = this.wb.SheetNames;
        if (this.sheetNames.length === 1) {
          this.currentSheet = this.sheetNames[0];
          this.onSheetChange();
        }
        this.loadingFile = false;
      };
      this.flagDisabled = false;
      reader.readAsBinaryString(target.files[0]);
      this.currentSheet = null;
      this.sizeerror =undefined;
    }
    catch (e) {
      console.error('file read error', e);
    }
    finally {

    }

  }

  resetFormData() {
    this.formdata = {
      InstitutionId: null,
      StudentId: null,
      FirstName: null,
      MiddleName: null,
      LastName: null,
      Program: null,
      Intake: null,
      AgentName: null,
      FeeAmount: null,
      CommissionAmount: null
    };
  }

  onSheetChange($event?) {
    try {

      this.loadingFile = true;
      this.resetFormData();
      this.columnsListOption = [];
      let data = [];
      this.sizeerror = undefined;

      const ws: XLSX.WorkSheet = this.wb.Sheets[this.currentSheet]; 
      data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false,defval: ''}));
      //Worksheet sheet = sheets[0];
      // Delete the Blank Rows from the worksheet
      

      if (data.length <= 1) {
        this.sizeerror = "This sheet has no data";
        return
      }
      this.columnsListOption = Object.assign([], data[0]);
      if(this.columnsListOption.findIndex(d=>{
        return d === 'StudentID'
      }) >= 0){
        this.formdata.StudentId = 'StudentID';
      }
      if(this.columnsListOption.findIndex(d=>{
        return d === 'Firstname'
      }) >= 0){
        this.formdata.FirstName = 'Firstname';
      }
      if(this.columnsListOption.findIndex(d=>{
        return d === 'Middlename'
      }) >= 0){
        this.formdata.MiddleName = 'Middlename';
      }
      if(this.columnsListOption.findIndex(d=>{
        return d === 'Lastname'
      }) >= 0){
        this.formdata.LastName = 'Lastname';
      }
      if(this.columnsListOption.findIndex(d=>{
        return d === 'Program'
      }) >= 0){
        this.formdata.Program = 'Program';
      }
      if(this.columnsListOption.findIndex(d=>{
        return d === 'Intake'
      }) >= 0){
        this.formdata.Intake = 'Intake';
      }
      if(this.columnsListOption.findIndex(d=>{
        return d === 'Agent'
      }) >= 0){
        this.formdata.AgentName = 'Agent';
      }
      if(this.columnsListOption.findIndex(d=>{
        return d === 'Fees'
      }) >= 0){
        this.formdata.FeeAmount = 'Fees';
      }
      if(this.columnsListOption.findIndex(d=>{
        return d === 'Commission'
      }) >= 0){
        this.formdata.CommissionAmount = 'Commission';
      }
    }
    finally {
      this.loadingFile = false;
    }
  }

  columnChange(evt, item) {
    //console.log(evt);
  }

  save(form: NgForm) {
    const ws: XLSX.WorkSheet = this.wb.Sheets[this.currentSheet];
    let dataObj = XLSX.utils.sheet_to_json(ws);
    let serviceData = [];
    if (form.invalid) {
      return;
    }

    dataObj.forEach(item => {
      if (item[this.formdata.StudentId]) {
        serviceData.push(
          {
            StudentId: this.getValue(item, this.formdata.StudentId),
            FirstName: this.getValue(item, this.formdata.FirstName),
            MiddleName: this.getValue(item, this.formdata.MiddleName),
            LastName: this.getValue(item, this.formdata.LastName),
            Program: this.getValue(item, this.formdata.Program),
            Intake: this.getValue(item, this.formdata.Intake),
            AgentName: this.getValue(item, this.formdata.AgentName),
            FeeAmount: this.getValue(item, this.formdata.FeeAmount),
            CommissionAmount: this.getValue(item, this.formdata.CommissionAmount),
          }
        );
      }
    });

    this.flagDisabled = true;
    this.batchService.agentCommissionUpload(this.formdata.InstitutionId, serviceData)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success','Import batch saved successfully');
        this.flagDisabled = false;
        this.redirect();
      },
        err => {
          this.flagDisabled = false;
        });
  }

  redirect() {
    this.router.navigate(['/member/import-batch'], { queryParams: { batch: 'commission' } });
  }

  listInstitution() {
    this.instService.forDDL()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.instList = res;
      });
  }

  getValue(item: any, prop: string) {
    try {
      return item[prop] ? item[prop] : null;
    }
    catch {
      return null;
    }
  }

}
