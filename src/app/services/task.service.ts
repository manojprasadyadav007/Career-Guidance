import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  APIURL:string= environment.apiurl+"Task/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(TaskId:number){
    return this.http.post(this.APIURL+"Delete?TaskId="+TaskId,{});
  }

  list(ParentId:number,ParentType:number,keyword:string){
    return this.http.post<any[]>(this.APIURL+"List",{
        ParentId:ParentId,
        ParentType:ParentType,
        keyword:keyword
    });
  }
  listByuser(UserId: number){
    return this.http.get<any[]>(this.APIURL+"ListByUser?AssignedTo="+UserId);
  }

  getTaskType() {
    return this.http.get<any>(this.APIURL+"GetTaskType");
  }
  get(TaskId:number){
    return this.http.get<any>(this.APIURL+"Get?TaskId="+TaskId);
  }
  listByFilter(data){
    return this.http.post<any>(this.APIURL+"ListByFilter" ,data);
  }

}
