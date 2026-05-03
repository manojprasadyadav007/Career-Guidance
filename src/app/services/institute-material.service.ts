import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstituteMaterialService {

  APIURL:string= environment.apiurl+"InstituteMaterial/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(MaterialId:number){
    return this.http.post(this.APIURL+"Delete?MaterialId="+MaterialId,{});
  }

  list(institutionId:number){
    return this.http.get<any[]>(this.APIURL+"List?InstitutionId="+institutionId);
  }

  get(MaterialId:number){
    return this.http.get<any>(this.APIURL+"Get?MaterialId="+MaterialId);
  }

  listOfFile(institutionId:number) {
    return this.http.get<any[]>(this.APIURL+"List_ForFileDisplay?InstitutionId="+institutionId);
  }
}
