import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstititionApplicationFieldService {

  APIURL:string= environment.apiurl+"InstitutionApplicationField/";

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

  uploadCC(form:any){
    return this.http.post(this.APIURL+"UploadCC",form);
  }
  deleteCC(form:any){
    return this.http.post(this.APIURL+"DeleteCCForm?",form);
  }
}
