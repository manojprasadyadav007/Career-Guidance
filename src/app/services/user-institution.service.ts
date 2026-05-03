import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInstitutionService {

  APIURL:string= environment.apiurl+"UserInstitution/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post<any>(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post<any>(this.APIURL+"Update",form);
  }

  get(AssignId:number){
    return this.http.get<any>(this.APIURL+"Get?AssignId="+AssignId);
  }

  delete(AssignId:number){
    return this.http.post<any>(this.APIURL+"Delete?AssignId="+AssignId,{});
  }

  list(UserId:number){
    return this.http.get<any[]>(this.APIURL+"List?UserId="+UserId);
  }
}
