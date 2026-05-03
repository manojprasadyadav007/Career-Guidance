import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MSMAgent } from 'app/models/agent-model';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class MSMAgentService {

  APIURL: string = environment.apiurl + "Agent/";

  constructor(private http: HttpClient,
    private encryptionService: EncryptionService) { }

  add(form: MSMAgent) {
    return this.http.post(this.APIURL + "Add", form);
  }

  update(form: MSMAgent) {
    return this.http.post(this.APIURL + "Update", form);
  }

  delete(AgentId: number) {
    return this.http.post(this.APIURL + "Delete?AgentId=" + AgentId, {});
  }

  get(AgentId: number): Observable<MSMAgent> {
    return this.http.post<MSMAgent>(this.APIURL + "Get?AgentId=" + AgentId, {});
  }

  statusChange(data: any) {
    return this.http.post(this.APIURL + "StatusChange", data);
  }

  list(keyword: string) {
    return this.http.post<any[]>(this.APIURL + "List", { keyword: keyword });
  }

  getAssignedAgentList(keyword: string, countryId: any, provinceId: any) {
    return this.http.post<any[]>(this.APIURL + "ListByFilter", { keyword: keyword, CountryId: countryId, ProvinceId: provinceId });
  }

  signup(form: any) {
    return this.http.post(this.APIURL + "Signup", form);
  }

  getDetail(AgentId: number) {
    return this.http.post<any>(this.APIURL + "GetDetail?AgentId=" + AgentId, {});
  }

  ForDDLForStudent() {
    return this.http.get<any[]>(this.APIURL + "ForDDLForStudent");
  }

  forDDL() {
    return this.http.get<any[]>(this.APIURL + "ForDDL");
  }


  forDDLByCountry(CountryId: number) {
    return this.http.get<any[]>(this.APIURL + "ForDDLByCountry?CountryId=" + CountryId);
  }

  getName(agentid: number) {
    return this.http.get<string>(this.APIURL + "GetName?AgentId=" + agentid);
  }

  forDDLForApplication(instId: number) {
    return this.http.get<any[]>(this.APIURL + "ForDDLForApplication?InstitutionId=" + instId);
  }

  forDDLByPartnerType(PartnerTypeId: number) {
    return this.http.get<any[]>(this.APIURL + "ForDDLByPartnerType?PartnerTypeId=" + PartnerTypeId);
  }


  foragentLogList(agentid: number) {
    return this.http.post<any[]>(this.APIURL + "AgentLogList", { AgentID: agentid });
  }
  businessCertStatus(){
    return this.http.get<any>(this.APIURL + "BusinessCertStatus" );
  }

}
