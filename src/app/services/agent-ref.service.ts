import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AgentRefService {

  APIURL:string= environment.apiurl+"AgentRef/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(CommissionId:number){
    return this.http.post(this.APIURL+"Delete?RefId="+CommissionId,{});
  }

  list(AgentId:number) {
    return this.http.get<any[]>(this.APIURL+"List?AgentId="+AgentId);
  }

  get(CommissionId:number){
    return this.http.get<any>(this.APIURL+"Get?RefId="+CommissionId);
  }

  statusUpdate(RefId:number,Status:number){
    return this.http.post(this.APIURL+"StatusUpdate",{RefId:RefId,StatusId:Status});
  }
}
