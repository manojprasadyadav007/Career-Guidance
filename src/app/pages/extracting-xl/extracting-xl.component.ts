import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { NgForm } from '@angular/forms';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
@Component({
  selector: 'app-extracting-xl',
  templateUrl: './extracting-xl.component.html',
  styleUrls: ['./extracting-xl.component.scss']
})
export class ExtractingXlComponent implements OnInit {
  formdata =[];
  dataObj = [];
  serviceData =[];
  data :any;
  fileName :any;
  sizeerror:any = undefined;
  showSavebtn:boolean = false;
  columnsList:any = [];
  flagDisabled:boolean = false;
  @ViewChild('myfileInput' , {static:false}) fileInput: ElementRef;
  columnsListOption:any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  constructor(private misc :MiscService , private toasterService : ToasterService , private router : Router) { }
  ngOnInit() {
  }

  fileChange(evt){
    const target: DataTransfer = <DataTransfer>(evt.target);
   let filedetails = target.files[0];
      this.fileName = filedetails.name;
    let workBook = null;
    let jsonData = null;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      workBook = XLSX.read(bstr, { type: 'binary' });
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
          this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
           
            initial = XLSX.utils.sheet_to_json(sheet);
            return initial;
          }, {});
         if(this.data.length == 0 ){
          this.sizeerror = "excel has no data";
          return}else{
            this.sizeerror = undefined;
          };
      this.dataObj =  jsonData;
      this.columnsListOption = Object.assign([], this.data[0]);
      this.data[0].forEach((element, index) => {
       this.formdata.push({columnName:element ,header:'', value: ''});
      });
      this.showSavebtn = this.formdata.length >0 ? true : false ;
    //  this.columnsListOption.splice( 0, 0, 'select header'); 
    };
    this.flagDisabled = false;
    reader.readAsBinaryString(target.files[0]);
}

columnChange(evt , data){
    let datalist = this.formdata.filter(ele =>{
    if(ele.header == evt.value){ return ele; }
  });
  if(datalist.length >= 2){
        this.formdata.forEach(element =>{
          if(element.columnName == data.columnName)
          { 
            alert("Already "+ "'"+ element.header +"' "+  "  is selected , please select another option");};
        });
      }
}

save(form :NgForm){
  this.serviceData =[];
    if(form.invalid){
      return;
    }
    this.formdata.forEach(element =>{
      if(element.header == ""){return; }

     });
    this.formdata.forEach(element =>{
        this.dataObj.forEach(item => {
          this.serviceData.push(Object.assign( {} ,element, item));
        });
    });  
    this.flagDisabled =true;
    this.misc.excelExtractedList(this.serviceData).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.toasterService.pop('success', 'Excel data saved successfully');
    this.resetfields();
    });
}

resetfields(){
  this.flagDisabled = true;
  this.showSavebtn = false;
  this.sizeerror =undefined;
  this.fileInput.nativeElement.value = "";
  this.formdata =[];
  this.dataObj = [];
  this.serviceData =[];
  this.columnsList = [];
  this.columnsListOption = [];
}
redirect(){
  this.router.navigate(['/member/excel-extraction/']);
}
}
