import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendeService {

  APIURL:string= environment.apiurl+"Attende/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }
  delete(AttendeeId:number){
    return this.http.post(this.APIURL+"Delete?AttendeId="+AttendeeId,{});
  }

  list(parentType:number,parentId:number,attendeType:number,keyword:string){
    return this.http.post<any[]>(this.APIURL+"List",{
      ParentId:parentId,
      ParentType:parentType,
      AttendeType:attendeType,
      keyword:keyword
    });
  }
}
