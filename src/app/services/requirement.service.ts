import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  APIURL:string= environment.apiurl+"ProgramRequirement/";


  constructor(private http:HttpClient) { }



  add(data:any){
    return this.http.post(this.APIURL+"Add",data);
  }

  delete(RequirementId:number){
    return this.http.post(this.APIURL+"Delete?RequirementId="+RequirementId,{});
  }

  list(ProgramId:number,ReqType:number):Observable<any[]>{
    return this.http.get<any[]>(this.APIURL+"List?ProgramId="+ProgramId+"&ReqType="+ReqType);
  }

  ListRequirement(ReqType:number):Observable<any[]>{
    return this.http.get<any[]>(this.APIURL+"RequirementList?ReqTypeId="+ReqType);
  }
}
