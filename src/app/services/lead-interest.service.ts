import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadInterestService {

  APIURL:string= environment.apiurl+"LeadInterest/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  delete(InterestId:number){
    return this.http.post(this.APIURL+"Delete?InterestId="+InterestId,{});
  }

  list(LeadId:number){
    return this.http.get<any[]>(this.APIURL+"List?LeadId="+LeadId);
  }
 
}
