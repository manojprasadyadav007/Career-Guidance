import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoicePaymentService {

  APIURL:string= environment.apiurl+"InvoicePayment/";

  constructor(private http:HttpClient) { }

  add(form){
    return this.http.post(this.APIURL+"Add",form);
  }

  delete(PaymentId:number){
    return this.http.post(this.APIURL+"Delete?PaymentId="+PaymentId,{});
  }

  list(InvoiceId:number){
    return this.http.get<any[]>(this.APIURL+"List?InvoiceId="+InvoiceId);
  }
}
