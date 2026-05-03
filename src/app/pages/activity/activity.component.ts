import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivityService } from 'app/services/activity.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnDestroy {

  @Input()
  activityList: any[];

  @Input()
  selectList: any[]

  @Input()
  showStatusDropDown: boolean = false;

  @Input()
  showPrioirtyDropDown: boolean = false;

  @Input()
  showAdd: boolean = false;

  @Input()
  ActivityType: number = 0;

  @Input()
  ActivityId: number = 0;

  @Input()
   Title:string = '';

   @Input()
   parentName='';

  @Input()
  btnLable: string = "Submit";

  @Input()
  @Output()
  formdata: any;

  @Output()
  submit = new EventEmitter<void>();

  @Input()
  showTable: boolean = false;

  @Input()
  remarkRequired: boolean = true;

  @Input()
  independed: boolean = false;

  @Input()
  status:number;

  @Input()
  priority:number;

  @Input()
  remarkLabel:string='Write your query here....';

  @Input()
  showCard:boolean=true;

  @Input()
  titleForLabel:string=''

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private activityService: ActivityService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    console.log(this.titleForLabel)
    this.listActivity();
    if(this.independed)
    {
      this.reset();
    }
  }

  reset()
  {
    this.formdata = { ActivityType: this.ActivityType ,ApplicationId:this.ActivityId, Remark: null, StatusId: this.status | 0, Priority: this.priority | -1 };
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  onSubmit() {
    if (this.independed) {
      this.activityService.add(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success", this.Title, "Saved successfully");
          this.reset();
          this.listActivity();
        });
    }
    else {
      this.submit.emit();
    }
  }

  listActivity() {
    if (this.independed) {
      this.activityService.list(this.ActivityType, this.ActivityId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.activityList = res;
        });
    }
  }

}
