import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignActivityService {

  APIURL:string= environment.apiurl+"CampaignActivity/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(ActivityId:number){
    return this.http.post(this.APIURL+"Delete?ActivityId="+ActivityId,{});
  }

  list(ParentId:number,ParentType:number){
    return this.http.get<any[]>(this.APIURL+"List?ParentId="+ParentId+"&ParentType="+ParentType);
  }

  get(ActivityId:number){
    return this.http.get<any>(this.APIURL+"Get?ActivityId="+ActivityId);
  }
}
