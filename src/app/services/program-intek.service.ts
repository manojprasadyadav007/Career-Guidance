import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProgramIntek } from 'app/models/program-intek.model';
import { Program } from 'app/models/program-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramIntekService {

  APIURL: string = environment.apiurl + "ProgramIntek/";

  constructor(private http: HttpClient) { }

  add(form: any) {
    return this.http.post(this.APIURL + "Add", form);
  }

  update(form: any) {
    return this.http.post(this.APIURL + "Update", form);
  }

  delete(IntekId: number) {
    return this.http.post(this.APIURL + "Delete?IntekId=" + IntekId, {});
  }

  get(IntekId: number) {
    return this.http.get<any>(this.APIURL + "Get?IntekId=" + IntekId, {});
  }

  list(ProgramId: number)  {
    return this.http.get<ProgramIntek[]>(this.APIURL + "List?ProgramId=" + ProgramId);
  }

  forDDL(ProgramId: number,RegionId:number)  {
    return this.http.get<any[]>(this.APIURL + "ForDDL?ProgramId=" + ProgramId+"&RegionId="+RegionId);
  }

  forProgramSearch(Nationality:number)  {
    return this.http.post<any[]>(this.APIURL + "ForProgramSearch?Nationality="+Nationality,{});
  }

  forDDLByAgentAndCountry(ProgramId: number,AgentId:number,CountryId:number)  {
    return this.http.get<ProgramIntek[]>(this.APIURL + "ForDDLByAgentAndCountry?ProgramId=" + ProgramId+"&AgentId="+AgentId+"&CountryId="+CountryId);
  }

  bulkUpdate(data){
    return this.http.post<any[]>(this.APIURL +"ProgramIntekStatusUpdateBulk", data);
  }
  bulkUpdateList(data){
    
    return this.http.post<any[]>(this.APIURL  +"ListForBulkStatusUpdate", data);
  }

  programIntakeForApplication(ProgramId: number, ApplicationId:number,CountryId:number)  {
    return this.http.get<any[]>(this.APIURL + "PromIntakeForApplication?ProgramId=" + ProgramId+"&ApplicationId="+ApplicationId+"&CountryId="+CountryId);
  }

  campusList(IntakeId:number)  {
    return this.http.get<any[]>(this.APIURL + "CampusList?IntakeId=" + IntakeId);
  }

  ListForDeferApplication(ApplicationId:number)
  {
    return this.http.get<any[]>(this.APIURL + "ListForDeferApplication?ApplicationId=" + ApplicationId);
  }


}
