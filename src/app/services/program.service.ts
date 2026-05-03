import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Program } from 'app/models/program-model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  APIURL: string = environment.apiurl + "Program/";

  constructor(private http: HttpClient) { }

  add(formdata: any) {
    return this.http.post(this.APIURL + "Add", formdata);
  }

  update(formdata: any) {
    return this.http.post(this.APIURL + "Update", formdata);
  }

  delete(ProgramId: number) {
    return this.http.post(this.APIURL + "Delete?ProgramId=" + ProgramId, {});
  }

  get(ProgramId: number) {
    return this.http.post<Program>(this.APIURL + "Get?ProgramId=" + ProgramId, {});
  }

  list(InstituteId: number, keyword: string) {
    return this.http.post<Program[]>(this.APIURL + "List", { InstituteId: InstituteId, keyword: keyword });
  }

  getdetail(ProgramId: number) {
    return this.http.get(this.APIURL + "GetDetail?ProgramId=" + ProgramId, {});
  }

  getSpecializationList(ProgramId: number) {
    return this.http.get(this.APIURL + "Specialization?ProgramId=" + ProgramId, {});
  }
  forDDL(InstituteId: number) {
    return this.http.get<any[]>(this.APIURL + "ForDDL?InstitutionId=" + InstituteId);
  }


  forDDLByAgentAndCountry(InstituteId: number, AgentId: number, CountryId: number) {
    return this.http.get<any[]>(this.APIURL + "ForDDLByAgentAndCountry?InstitutionId=" + InstituteId + "&AgentId=" + AgentId + "&CountryId=" + CountryId);
  }

  noOfSemester(ProgramId: number) {
    return this.http.post<number>(this.APIURL + "NoOfSemester?ProgramId=" + ProgramId, {});
  }

  forInstPage(institutionId: number) {
    return this.http.get<any[]>(this.APIURL + "ForInstPage?InstitutionId=" + institutionId, {});
  }

  listContactForInstitute(institutionId: number) {
    return this.http.get<any[]>(this.APIURL + "ContactListforPage?InstituteId=" + institutionId, {});
  }

  listContactForProgram(programId: number) {
    return this.http.get<any[]>(this.APIURL + "ContactListforPage?ProgramId=" + programId, {});
  }

  campus(programId: number) {
    return this.http.get<any[]>(this.APIURL + "Campus?ProgramId=" + programId);
  }

  mode(programId: number) {
    return this.http.get<any[]>(this.APIURL + "Mode?ProgramId=" + programId);
  }

  ForProgramPage(ProgramId: number) {
    return this.http.get(this.APIURL + "ForProgramPage?ProgramId=" + ProgramId, {});
  }

  clone(programID: number) {
    return this.http.post<any>(this.APIURL + "Clone?ProgramID=" + programID, {});
  }

  otherProgramList(programId: number) {
    return this.http.get<any[]>(this.APIURL + "OtherProgramList?ProgramId=" + programId, {});
  }


  ForProgramIntakeList(institutionId:number){
    return this.http.get<any[]>(this.APIURL+"ForIntakeSelection?InstitutionId="+institutionId,{});
  }



}
