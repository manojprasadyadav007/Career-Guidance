import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InstCountryService } from 'app/services/inst-country.service';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit ,OnDestroy{

  formdata: any;
  countryList:any[];
  globalList:any[];
  contList:any[];
  countrylistData:any = [];
  flagdisabled:boolean = false;
  private onDestroy$: Subject<void> = new Subject<void>();

  regionFilter:string='';

  constructor(private instCountryService: InstCountryService,
    private dialogRef: MatDialogRef<AddCountryComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private miscService:MiscService
  ) {
    this.formdata = 
    {
      InstitutionId:data.institutionId,
      CountryId:0
    }
  }

  ngOnInit() {
    this.listCountry();
  }

  onSubmit(form: NgForm) {
    this.flagdisabled = true
      this.instCountryService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dialogRef.close(true);
      },err =>{
        this.flagdisabled =false;
      });
  }

  listCountry()
  {
    this.miscService.countryWithGroup(this.formdata.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      
     let valuelist=  res.map(item => item.GroupName).filter((value, index, self) => self.indexOf(value) === index);
        valuelist.forEach((item , index )=>{   this.countrylistData.push({'group':item, data: res.filter(d=>d.GroupName===item )})
      });
      //   this.countryList=res.filter(d=>d.GroupName==='Countries' );
      // this.globalList=res.filter(d=>d.GroupName==='Global' );
      // this.contList=res.filter(d=>d.GroupName==='Continents' );
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
