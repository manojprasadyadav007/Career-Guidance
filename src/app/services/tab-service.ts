
import { Injectable } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  constructor() { }

// obj= {institution: 0 , agent: 0 }
  obj = {tabIndex:0 , pageName:''};
  public tabData: BehaviorSubject<any> = new BehaviorSubject<any>(this.obj);

  tabActive: Observable<any> = this.tabData.asObservable();
  getTab(tabIndex , tabLabel): void {
   this.obj.tabIndex =tabIndex;
    this.obj.pageName= tabLabel;
      this.tabData.next(this.obj);
  }

  tabDetails(tabGroup: MatTabGroup):Observable<any>{
    if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return of(null);

      return of(this.obj);
      // let tab =  tabGroup._tabs.toArray().find((tabItem: MatTab) => tabItem.textLabel === this.obj.pageName);
      //  if (tab && !tab.disabled){
      //    return of(this.obj);
      //   }else{
      //     return of(null);
      //   }
      // }
  }
}
