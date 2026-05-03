import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  APIURL: string = environment.apiurl + 'Reports/';

  constructor(private http: HttpClient) { }


  report(reportname: string, data: any): Observable<any> {
    return this.http.post<any>(this.APIURL + 'Dynamic/' + reportname, data);
  }

  searchProgram(data: any) {
    return this.http.post<any[]>(this.APIURL + 'SearchProgram', data);
  }

  programByFilter(data: any) {
    return this.http.post<any[]>(this.APIURL + 'ProgramByFilter', data);
  }

  passportExpiry(data: any): Observable<any> {
    return this.http.post<any>(this.APIURL + 'PassportExpiry', data);
  }



}
