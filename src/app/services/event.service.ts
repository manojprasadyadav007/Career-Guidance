import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  APIURL:string= environment.apiurl+"Event/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(EventId:number){
    return this.http.post(this.APIURL+"Delete?EventId="+EventId,{});
  }

  list(ParentId:number,ParentType:number){
    return this.http.get<any[]>(this.APIURL+"List?ParentId="+ParentId+"&ParentType="+ParentType);
  }

  get(EventId:number){
    return this.http.get<any>(this.APIURL+"Get?EventId="+EventId);
  }

  listByApplication(ApplicationId:number){
    return this.http.get<any[]>(this.APIURL+"ListByApplication?ApplicationId="+ApplicationId);
  }

  myToDo(){
    return this.http.get<any[]>(this.APIURL+"MyToDo");
  }
}
