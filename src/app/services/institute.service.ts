import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Institute } from 'app/models/institution-model';
import { environment } from 'environments/environment';
import { EncryptionService } from './encryption.service';


@Injectable({
  providedIn: 'root'
})
export class InstituteService {


  APIURL: string = environment.apiurl + "Institute/";

  constructor(private http: HttpClient,
    private encryptionService: EncryptionService) { }

  add(form: Institute) {
    return this.http.post(this.APIURL + "Add", form);
  }

  update(form: Institute) {
    return this.http.post(this.APIURL + "Update", form);
  }

  delete(InstituteId: number) {
    return this.http.post(this.APIURL + "Delete?InstituteId=" + InstituteId, {});
  }

  get(InstituteId: number) {
    return this.http.post(this.APIURL + "Get?InstituteId=" + InstituteId, {});
  }

  list(keyword: string) {
    return this.http.post<any[]>(this.APIURL + "List", { keyword: keyword });
  }

  listForAgent(keyword: string) {
    return this.http.post<any[]>(this.APIURL + "ListForAgentDisplay", { keyword: keyword });
  }


  forDDLBYPartnerType(PartnerTypeId: number) {
    return this.http.get<any[]>(this.APIURL + "ForDDLBYPartnerType?PartnerTypeId=" + PartnerTypeId);
  }

  forDDL() {
    return this.http.get<any[]>(this.APIURL + "ForDDL");
  }

  getDetail(InstituteId: number) {
    return this.http.post(this.APIURL + "GetDetail?InstituteId=" + InstituteId, {});
  }

  getFlow(InstituteId: number, CountryId: number) {
    return this.http.get<any[]>(this.APIURL + "ApplicationFlow?InstituteId=" + InstituteId + "&CountryId=" + CountryId, {});
  }

  updateFlow(institutionId: number, countryId: number, flow: any) {
    return this.http.post(this.APIURL + "ApplicationFlowUpdate", { InstitutionId: institutionId, CountryId: countryId, flow: flow });
  }

  applicationStatus(InstituteId: number, CountryId: number) {
    return this.http.get<any[]>(this.APIURL + "ApplicationStatus?InstituteId=" + InstituteId + "&CountryId=" + CountryId, {});
  }

  forProgramSearch(data: any) {
    return this.http.post<any[]>(this.APIURL + "ForProgramSearch", data);
  }

  forDDLByAgentAndCountry(AgentId: number, CountryId: number) {
    return this.http.get<any[]>(this.APIURL + "ForDDLByAgentAndCountry?AgentId=" + AgentId + "&CountryId=" + CountryId);
  }

  forAgentEvolutionForm(AgentId: number, ApplicationId: number) {
    return this.http.get<any[]>(this.APIURL + "ForAgentEvolutionForm?AgentId=" + AgentId + "&ApplicationId=" + ApplicationId);
  }

  team(institutionId: number) {
    return this.http.post<any[]>(this.APIURL + "Team?InstitutionId=" + institutionId, {});
  }

  applicationStatusForDropDown(InstituteId: number, CountryId: number) {
    return this.http.get<any[]>(this.APIURL + "ApplicationStatusForDropDown?InstituteId=" + InstituteId + "&CountryId=" + CountryId, {});
  }

  agents(institutionId: number) {
    return this.http.get<any[]>(this.APIURL + "Agents?InstitutionId=" + institutionId);
  }

  getShortDetail(InstituteId: number) {
    return this.http.post<any>(this.APIURL + "GetShortDetail?InstituteId=" + InstituteId, {});
  }

  getLogo(InstituteId: number) {
    return this.http.get<any>(this.APIURL + "GetLogo?InstituteId=" + InstituteId);
  }


  getUpcommingEvents(institutionId: number) {
    return this.http.get<any>(this.APIURL + "UpcommingEvents?InstitutionId=" + institutionId);
  }
  signup(data:any){
    return this.http.post<any>(this.APIURL+"Signup",data);
  }


  listContactForInstitute(institutionId: number) {
    return this.http.get<any[]>(this.APIURL + "ContactListforPage?InstitutionId=" + institutionId, {});
  }

  statusChange(InstituteId: number, Status: number) {
    return this.http.post<any>(this.APIURL + "Status",
    {
      InstituteId: InstituteId,
      Status : Status
    })
  }


}
