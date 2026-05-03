import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstCampusService {

  APIURL:string= environment.apiurl+"InstCampus/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(instCampusId:number){
    return this.http.post(this.APIURL+"Delete?InstCampusId="+instCampusId,{});
  }

  list(institutionId:number):Observable<any[]>{
    return this.http.get<any[]>(this.APIURL+"List?InstitutionId="+institutionId);
  }
  get(InstCampusId: number){
    return this.http.get<any[]>(this.APIURL+"Get?InstCampusId="+InstCampusId);
  }

}
