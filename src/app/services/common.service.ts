import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public BusinessStatus = new Subject<boolean>();
  public profileFormStatus  = new Subject<any>();
  public BusinessProfileStatus = new Subject<any>();
  constructor() { }
}
