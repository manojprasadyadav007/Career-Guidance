import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentCommissionService {

  APIURL:string= environment.apiurl+"AgentCommission/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(CommissionId:number){
    return this.http.post(this.APIURL+"Delete?CommissionId="+CommissionId,{});
  }

  list(AgentId:number):Observable<any[]>{
    return this.http.get<any[]>(this.APIURL+"List?AgentId="+AgentId);
  }

  get(CommissionId:number):Observable<any[]>{
    return this.http.get<any[]>(this.APIURL+"Get?CommissionId="+CommissionId);
  }
}
