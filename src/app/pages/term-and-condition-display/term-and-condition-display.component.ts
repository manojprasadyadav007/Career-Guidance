import { Component, OnInit, OnDestroy } from '@angular/core';
import { MiscService } from 'app/services/misc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-term-and-condition-display',
  templateUrl: './term-and-condition-display.component.html',
  styleUrls: ['./term-and-condition-display.component.scss']
})
export class TermAndConditionDisplayComponent implements OnInit , OnDestroy {

  iAgree:boolean=false;
  content:string='this is service term and conditions';
  parentType:number;
  parentId:number;
  parentKey:string;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private miscService: MiscService,
    private route:ActivatedRoute,
    private toasterService:ToasterService,
    private router:Router
    ) {

     }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      var ptype = res.get('parentType').toLowerCase();
      if( ptype==='student')
      {
         this.parentType = 6;
      }
      else if(ptype==='agent')
      {
        this.parentType =9;
      }

      this.parentId = +res.get('parentId');

      this.parentKey = res.get('parentKey');

      this.getTerm();

    });


  }

  onSubmit()
  {
      this.miscService.serviceTermAccept(this.parentType,this.parentId,this.parentKey).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.toasterService.pop('success','Thank you');
        this.router.navigate(['/signin']);
      });
  }

  getTerm()
  {
    this.miscService.serviceTerm(this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.content = res.AgreementContents;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
