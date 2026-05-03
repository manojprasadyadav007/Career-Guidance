import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationFeeService {

  APIURL:string= environment.apiurl+"ApplicationFee/";

  constructor(private http:HttpClient) { }

  add(data:any){
    return this.http.post<string>(this.APIURL+"Add",data);
  }

  update(data:any){
    return this.http.post<string>(this.APIURL+"Update",data);
  }

  delete(DepositId:number){
    return this.http.post<string>(this.APIURL+"Delete?DepositId="+DepositId,{    });
  }

  list(ApplicationId:number){
    return this.http.get<any[]>(this.APIURL+"List?ApplicationId="+ApplicationId);
  }

  get(DepositId:number){
    return this.http.get<any>(this.APIURL+"Get?DepositId="+DepositId);
  }
}
