import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { InstitutionDescipline } from 'app/models/inst-desc.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionDesciplineService {

  APIURL:string= environment.apiurl+"InstituionDescipline/";

  constructor(private http:HttpClient) { }

  add(form:NgForm){
    return this.http.post(this.APIURL+"Add",form.value);
  }

  delete(instDescId:number){
    return this.http.post(this.APIURL+"Delete?InstDescId="+instDescId,{});
  }

  list(institutionId:number):Observable<InstitutionDescipline[]>{
    return this.http.get<InstitutionDescipline[]>(this.APIURL+"List?InstitutionId="+institutionId);
  }
}
