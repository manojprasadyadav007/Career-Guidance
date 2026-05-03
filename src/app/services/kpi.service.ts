import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KPIService {

  APIURL: string = environment.apiurl + 'KPI/';

  constructor(private http: HttpClient) { }


  main(reportname: any, data: any): Observable<any> {
    return this.http.post<any>(this.APIURL + 'Main/'+reportname, data);
  }

  sub(reportname: any, data: any): Observable<any> {
    return this.http.post<any>(this.APIURL + 'Sub/'+reportname, data);
  }


}
