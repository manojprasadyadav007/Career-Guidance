import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { LeadInterestService } from 'app/services/lead-interest.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { ProgramService } from 'app/services/program.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InstituteService } from 'app/services/institute.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-interest-add',
  templateUrl: './interest-add.component.html',
  styleUrls: ['./interest-add.component.scss']
})
export class InterestAddComponent implements OnInit, OnDestroy {

  formdata: any = { LeadId: 0, InstitutionId: undefined, RegionId: undefined, ProgramId: undefined };

  institutionList: any[];
  regionList: any[];
  programList: any[];
  instFilter:any='';
  prgFilter:any='';

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private leadInterestService: LeadInterestService,
    private instCountryService: InstCountryService,
    private programService: ProgramService,
    private matDialogRef: MatDialogRef<InterestAddComponent>,
    private instServce:InstituteService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.formdata.LeadId = data.LeadId;
   }

  ngOnInit() {
    this.instServce.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.institutionList = res;
    })
  }

  fillRegion() {
    //this.regionList = [];
    this.programList = [];

     if (this.formdata.InstitutionId > 0) {
    //   this.instCountryService.list(this.formdata.InstitutionId).subscribe(res => {
    //     this.regionList = res;
    //   });

      this.programService.forDDL(this.formdata.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.programList = res;
      });
    }
  }

  add() {
    this.leadInterestService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.matDialogRef.close(true);
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
