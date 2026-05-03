import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentSchoolService {

  
  APIURL:string= environment.apiurl+"StudentSchool/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(SchoolId:number){
    return this.http.post(this.APIURL+"Delete?SchoolId="+SchoolId,{});
  }

  list(ParentId:number,ParentType:number){
    return this.http.get<any[]>(this.APIURL+"List?ParentId="+ParentId+"&ParentType="+ParentType);
  }

  get(SchoolId:number){
    return this.http.get<any>(this.APIURL+"Get?SchoolId="+SchoolId);
  }

  eduLevel(parentType , parentId, schoolId){
    return this.http.get<any[]>(this.APIURL+`EduLevelForDDLByApplication?ParentType=${parentType}&ParentId=${parentId}&SchoolId=${schoolId}`);
  }
  
}
