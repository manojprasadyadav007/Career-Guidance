import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeeWaiverService {

  APIURL:string= environment.apiurl+"FeeWaiver/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(WaiverId:number){
    return this.http.post(this.APIURL+"Delete?WaiverId="+WaiverId,{});
  }

  list() {
    return this.http.get<any[]>(this.APIURL+"List");
  }

  get(WaiverId:number){
    return this.http.get<any>(this.APIURL+"Get?WaiverId="+WaiverId);
  }
}
