import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstituionApplicationFormService {

  APIURL:string= environment.apiurl+"InstitutionApplicationForm/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(ControlId:number){
    return this.http.post(this.APIURL+"Delete?ControlId="+ControlId,{});
  }

 

  get(InstitutionId:number){
    return this.http.get<any[]>(this.APIURL+"Get?InstitutionId="+InstitutionId);
  }

  upload(form:any){
    return this.http.post(this.APIURL+"Upload",form);
  }
}
