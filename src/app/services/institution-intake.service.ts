import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutionIntakeService {

  APIURL: string = environment.apiurl + 'InstitutionIntake/';

  constructor(private http: HttpClient) { }

  add(form: any) {
    return this.http.post(this.APIURL + 'Add', form);
  }

  update(form: any) {
    return this.http.post(this.APIURL + 'Update', form);
  }

  delete(IntakeGroupId: number) {
    return this.http.post(this.APIURL + 'Delete?IntakeGroupId=' + IntakeGroupId, {});
  }

  get(IntakeGroupId: number,InstitutionId:number) {
    return this.http.get<any>(this.APIURL + 'Get?IntakeGroupId=' + IntakeGroupId+'&InstitutionId='+InstitutionId, {});
  }

  list(InstitutionId: number)  {
    return this.http.get<any[]>(this.APIURL + 'List?InstitutionId=' + InstitutionId);
  }
 
  intakeList(instId){
    return this.http.get<any[]>(this.APIURL +'ForDropDownOpenOnly?InstitutionId='+instId);
  }

  ForDropDownOpenOnly(instId){
    return this.http.get<any[]>(this.APIURL +'ForDropDownOpenOnly?InstitutionId='+instId);
  }

  ForDDLByAgentAndCountry(instID , programID ,AgentId , CountryId){
    return this.http.get<any[]>(this.APIURL +'ForDDLByAgentAndCountry?InstitutionId='+instID +'&ProgramId='+programID +'&AgentId='+AgentId +'&CountryId='+CountryId );
  }
  ForReportFilter(institutionId:number){
    return this.http.get<any[]>(this.APIURL +'ForReportFilter?InstitutionId='+institutionId);
  }

  // ForDashboardFilter(){
  //   return this.http.get<any[]>(this.APIURL +'ForDashboardFilter');
  // }
  
  ForDashboardFilter(data){
    return this.http.get<any[]>(this.APIURL +'ForDashboardFilter?InstitutionId='+data);
  }
   
}
