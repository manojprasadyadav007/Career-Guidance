import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CampusService } from 'app/services/campus.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-show-campus',
  templateUrl: './show-campus.component.html',
  styleUrls: ['./show-campus.component.scss']
})
export class ShowCampusComponent implements OnInit , OnDestroy {

  @Input()
  intituteid:number;
  @Input()
  placeholder:string = "Select Campus";

  selectedCampus;
  campus: any[] = [];
  campusNames = ['Uber', 'Microsoft', 'Flexigen'];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private campusService:CampusService) { }

  ngOnInit() {
      // this.campusNames.forEach((c, i) => {
      //     this.campus.push({ id: i, campusname: c });
      // });
      this.getCampus();
  }

  addCampus(name) {
      return { CampusName: name, tag: true };
  }

  getCampus()
  {
      this.campusService.list(this.intituteid).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.campus=res;
      });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
