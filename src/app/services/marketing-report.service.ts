import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarketingReportService {
   // http://localhost:52841/MarketingReports/Dynamic/marketingmanager-master

  APIURL:string= environment.apiurl+"MarketingReports/Dynamic/";

  constructor(private http: HttpClient,) { }

  report(reportName , data){
    return this.http.post(this.APIURL + reportName , data );
  }

}