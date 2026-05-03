import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  APIURL:string= environment.apiurl+"Lead/";

  constructor(private http:HttpClient,
    private authService:AuthenticationService) { }

  add(form:any){
    form.UserId= this.authService.currentUserSubject.getValue().UserId;
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    form.UserId= this.authService.currentUserSubject.getValue().UserId;
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(LeadId:number){
    return this.http.post(this.APIURL+"Delete?LeadId="+LeadId,{});
  }

  list(keyword:string){
    return this.http.get<any[]>(this.APIURL+"List?keyword="+keyword);
  }

  get(LeadId:number){
    return this.http.get<any>(this.APIURL+"Get?LeadId="+LeadId);
  }
}
