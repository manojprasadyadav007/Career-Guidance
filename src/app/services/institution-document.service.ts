import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutionDocumentService {


  APIURL:string= environment.apiurl+"InstituteDocument/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post<string>(this.APIURL+"Add",form);
  }

  update(form: any) {
    return this.http.post<string>(this.APIURL + "Update", form);
  }
    
  delete(instituteDocumentId:number){
    return this.http.post(this.APIURL+"Delete?InstituteDocumentId="+instituteDocumentId,{});
  }

  list(instituteId:number){
    return this.http.get<any[]>(this.APIURL+"List?InstituteId="+instituteId);
  }

  get(instituteDocumentId:number){
    return this.http.get<any>(this.APIURL+"Get?InstituteDocumentId="+instituteDocumentId);
  }

  listForApplication(instituteId:number,countryId:number){
    return this.http.get<any[]>(this.APIURL+"ListForApplication?InstituteId="+instituteId+"&CountryId="+countryId);
  }

}
