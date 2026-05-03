import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EligibilityService {

  APIURL:string= environment.apiurl+"Eligibility/";

  constructor(private http:HttpClient) { }
  
  testEligibility(data:any){
    return this.http.post<string>(this.APIURL+"TestEligibility",data);
  }
  
  eligibleProgram(data:any){
    return this.http.post<any[]>(this.APIURL+"EligibleProgram",data);
  }

}
