import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentApplicationService {

  APIURL:string= environment.apiurl+"AgentApplication/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  status(form:any){
    return this.http.post(this.APIURL+"Status",form);
  }

  delete(ApplicationId:number){
    return this.http.post(this.APIURL+"Delete?ApplicationId="+ApplicationId,{});
  }

  list(AgentId:number){
    return this.http.get<any[]>(this.APIURL+"List?AgentId="+AgentId);
  }

  
  listAll(){
    return this.http.get<any[]>(this.APIURL+"ListAll");
  }

  get(ApplicationId:number,InstitutionId:number,AgentId:number){
    return this.http.get<any>(this.APIURL+"Get?ApplicationId="+ApplicationId+"&InstitutionId="+InstitutionId+"&AgentId="+AgentId);
  }
  print(ApplicationId:number){
    return this.http.get<string>(this.APIURL+"Print?ApplicationId="+ApplicationId);
  }
}
