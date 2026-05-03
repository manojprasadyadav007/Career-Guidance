import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramDocumentService {

  APIURL:string= environment.apiurl+"ProgramDocument/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  delete(Contactid:number){
    return this.http.post(this.APIURL+"Delete?DocumentId="+Contactid,{});
  }

  list(ProgramId:number){
    return this.http.get<any[]>(this.APIURL+"List?ProgramId="+ProgramId);
  }

  listForApplication(ApplicationId: number, ProgramId:number,CountryId:number){
    return this.http.get<any[]>(this.APIURL+"ListForApplication?ApplicationId="+ApplicationId+"&ProgramId="+ProgramId+"&CountryId="+CountryId);
  }
}
