import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RefundService {

  APIURL:string= environment.apiurl+"refund/";

  constructor(private http:HttpClient) { }


  list(data) {
    return this.http.post<any[]>(this.APIURL+'List', data);
  }

  refundStatus(data) {
    return this.http.post<any[]>(this.APIURL + 'refundStatus', data);
  }

}
