import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstCountryService {

  APIURL:string= environment.apiurl+"InstCountry/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  delete(CountryId:number,instId:number){
    return this.http.post(this.APIURL+"Delete?CountryId="+CountryId+"&InstitutionId="+instId,{});
  }

  list(institutionId:number){
    return this.http.get<any[]>(this.APIURL+"List?InstitutionId="+institutionId);
  }

  listForTab(institutionId:number){
    return this.http.get<any[]>(this.APIURL+"ListForTab?InstitutionId="+institutionId);
  }

  listForAgent(institutionId:number,agentId:number){
    return this.http.get<any[]>(this.APIURL+"ListForAgent?InstitutionId="+institutionId+"&AgentId="+agentId);
  }

  forApplication(intakeId:number){
    return this.http.get<any[]>(this.APIURL+"ForApplication?IntakeId="+intakeId);
  }
}
