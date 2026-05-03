import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  APIURL: string = environment.apiurl + 'Dashboard/';

  constructor(private http: HttpClient) { }

  tiles(Duration: number) {
    return this.http.get<any[]>(this.APIURL + 'Tiles?Duration=' + Duration);
  }

  myToDo() {
    return this.http.get<any[]>(this.APIURL + 'MyToDo');
  }

  recentPrograms() {
    return this.http.get<any[]>(this.APIURL + 'RecentPrograms');
  }

  recentApplications() {
    return this.http.get<any[]>(this.APIURL + 'RecentApplicationsNew');
  }

  programUpdates() {
    return this.http.get<any[]>(this.APIURL + 'ProgramUpdates');
  }

  programWiseApplicationChart() {
    return this.http.get<any[]>(this.APIURL + 'ProgramWiseApplicationChart');
  }

  monthWiseApplicationChart(year: number) {
    return this.http.get<any[]>(this.APIURL + 'MonthWiseApplicationChart?year=' + year);
  }

  news() {
    return this.http.get<any[]>(this.APIURL + 'News');
  }

  taskDisplay(assignedTo: number) {
    return this.http.get<any[]>(this.APIURL + 'TaskDisplay?AssignedTo=' + assignedTo);
  }

  IntakeForChart() {
    return this.http.get<any[]>(this.APIURL + 'IntakeForChartDDL');
  }
  ApplicationStatusByIntake(id: string) {
    return this.http.get<any[]>(this.APIURL + 'ApplicationStatusByIntake?IntakeName=' + id);
  }

  intakeForMarketingActivity(instituion: number) {
    return this.http.get<any[]>(this.APIURL + 'IntakeForMarketingActivity?InstitutionId=' + instituion);
  }

  marketingActivity(intake: string, instituion: number) {
    return this.http.get<any[]>(this.APIURL + 'MarketingActivity?IntakeName=' + intake + '&InstitutionId=' + instituion);
  }

  ProgramUpdatesForSearch(keyword: string) {
    return this.http.post<any[]>(this.APIURL + 'ProgramUpdatesForSearch', { keyword: keyword });
  }

  // Institution Dashboard  start
  ProgramWiseApplicationCount() {
    return this.http.get<any[]>(this.APIURL + 'ProgramWiseApplicationCount');
  }

  CountryWiseApplicationCount() {
    return this.http.get<any[]>(this.APIURL + 'CountryWiseApplicationCount');
  }

  StatusOutcomeWiseApplicationCount(intakeName) {
    if (intakeName.length === 0) { return; }
    return this.http.get<any[]>(this.APIURL + 'StatusOutcomeWiseApplicationCount?IntakeName=' + intakeName);
  }

  ApplicationStatusWiseApplicationCount(intakeName) {
    if (intakeName.length === 0) { return; }
    return this.http.get<any[]>(this.APIURL + 'ApplicationStatusWiseApplicationCount?IntakeGroupId=' + intakeName);
  }

  ActionableAlerts() {
    return this.http.get<any[]>(this.APIURL + 'ActionableAlerts');
  }
 
  studentApplicationandEnrollmentGrowth(intakeId:number,applicationType:number, inst :number){
      return this.http.get<any>(this.APIURL + "studentApplicationandEnrollmentGrowth?IntakeId="+ intakeId+"&ApplicationType="+ applicationType+"&InstitutionId="+inst)
  }
   // Institution Dashboard ends
   studentGrowth(serviceName:string , inst: number ,intakeId:number , application:number ){

    return this.http.post<any[]>(this.APIURL + 'StudentGrowth/'+serviceName , { IntakeId :intakeId  , ApplicationType :application , InstitutionId :inst});
   }


}
