import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubTitleService {
  public name  = new Subject<string>();
  constructor() { }
}
