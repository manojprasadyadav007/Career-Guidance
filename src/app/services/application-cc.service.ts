import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationCCService {

  APIURL:string= environment.apiurl+"ApplicationCC/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  get(ApplicationId:number){
    return this.http.post<any>(this.APIURL+"Get?ApplicationId="+ApplicationId,{});
  }

  getCode(applicationId:number){
    return this.http.post<string>(this.APIURL+"GetCode",{ApplicationId:applicationId});
  }

  verifyCode(applicationId:number,code:string){
    return this.http.post<string>(this.APIURL+"VerifyCode",{ApplicationId:applicationId,Code:code});
  }
}
