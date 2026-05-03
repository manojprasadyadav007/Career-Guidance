import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {
  public myData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  output: Observable<any> = this.myData.asObservable();
  outPutsubj(data): void {
       
      this.myData.next(data);
  }

  constructor() { }
}
