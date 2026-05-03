import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentInstitutionService {

  APIURL:string= environment.apiurl+"AgentInstitution/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  delete(id:number){
    return this.http.post(this.APIURL+"Delete",{
      AgentInstitutionId:id
    });
  }

  list(AgentId:number){
    return this.http.get<any[]>(this.APIURL+"List?AgentId="+AgentId);
  }

  forDDL(AgentId:number){
    return this.http.get<any[]>(this.APIURL+"ForDDL?AgentId="+AgentId);
  }

  blackListAdd(form:any){
    return this.http.post(this.APIURL+"BlackListAdd",form);
  }

  blackListDelete(form:any){
    return this.http.post(this.APIURL+"BlackListDelete",form);
  }


}
