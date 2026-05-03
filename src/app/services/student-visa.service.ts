import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudentVisaService {

  APIURL:string= environment.apiurl+"StudentVisa/";

  constructor(private http:HttpClient,
    private authServices:AuthenticationService) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(StudentVisaId:number){
    return this.http.post(this.APIURL+"Delete?StudentVisaId="+StudentVisaId+"&UserId="+this.authServices.currentUserSubject.getValue().UserId,{});
  }

  list(StudentId:number){
    return this.http.get<any[]>(this.APIURL+"List?StudentId="+StudentId);
  }

  get(StudentVisaId:number){
    return this.http.get<any>(this.APIURL+"Get?StudentVisaId="+StudentVisaId);
  }
}
