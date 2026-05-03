import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public mydata: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }
  setMenu(menuLIst: string) {
    this.mydata.next(menuLIst);

}

getMenu(): Observable<any> {
    return this.mydata.asObservable();
}

}
