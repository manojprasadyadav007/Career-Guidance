import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnDocumentUploadService {

  public businessCertificate = new Subject<any>();
  constructor() { }
}
