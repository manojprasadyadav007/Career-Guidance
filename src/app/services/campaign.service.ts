import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  APIURL:string= environment.apiurl+"Campaign/";

  constructor(private http:HttpClient) { }
  
  list(keyword:string){
    return this.http.get<any[]>(this.APIURL+"List?keyword="+keyword);
  }

  ddl(){
    return this.http.get<any[]>(this.APIURL+"DDL");
  }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(CampaignId:number){
    return this.http.post(this.APIURL+"Delete?CampaignId="+CampaignId,{});
  }

  get(CampaignId:number){
    return this.http.get<any>(this.APIURL+"Get?CampaignId="+CampaignId);
  }
  material(params :any){
    return this.http.post<any>(this.APIURL+"Material",params);
  }


}
