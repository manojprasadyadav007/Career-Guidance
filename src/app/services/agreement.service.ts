import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

 
  APIURL:string= environment.apiurl+"Agreement/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(AgreementId:number,requestid:string){
    return this.http.post(this.APIURL+"Delete?AgreementId="+AgreementId+"&requestid="+requestid,{});
  }

  list(ParentId:number,ParentType:number){
    return this.http.get<any[]>(this.APIURL+"List?ParentId="+ParentId+"&ParentType="+ParentType);
  }

  get(AgreementId:number){
    return this.http.get<any>(this.APIURL+"Get?AgreementId="+AgreementId);
  }

  notificationList(requestid:string){
    return this.http.get<any[]>(this.APIURL+"NotificationList?requestid="+requestid);
  }

}
