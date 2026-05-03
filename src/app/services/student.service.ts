import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Student } from 'app/models/student.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  APIURL:string= environment.apiurl+"Student/";

  constructor(private http:HttpClient) { }

  add(form:Student){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:Student){
    return this.http.post(this.APIURL+"Update",form);
  }

  updateGenInfo(data:any){
    return this.http.post(this.APIURL+"UpdateGenInfo",data);
  }

  updateEduInfo(data:any){
    return this.http.post(this.APIURL+"UpdateEduInfo",data);
  }

  updateTestScore(data:any){
    return this.http.post(this.APIURL+"UpdateTestScore",data);
  }

  delete(StudentId:number){
    return this.http.post(this.APIURL+"Delete?StudentId="+StudentId,{});
  }

  get(StudentId:number){
    return this.http.post<any>(this.APIURL+"Get?StudentId="+StudentId,{});
  }

  getSectionWise(StudentId:number){
    return this.http.post<any>(this.APIURL+"getSectionWise?StudentId="+StudentId,{});
  }
  sendInvitations(StudentId){
    return this.http.post<any>(this.APIURL+"Invitation?StudentId="+StudentId,{});
  }


  list(keyword:string){
    return this.http.post<Student[]>(this.APIURL+"List",{
      keyword:keyword
    });
  }

  login(data:any)
  {
    return this.http.post(this.APIURL+"Login",data);
  }

  search(keyword:string){
    return this.http.get<any[]>(this.APIURL+"Search?keyword="+keyword);
  }
  signup(form:any){
    return this.http.post(this.APIURL+"Signup",form);
  }
  listDetailed(keyword:string){
    return this.http.post<any>(this.APIURL+"ListDetailed",{
      keyword:keyword
    });
  }

  signupWithSocialAccount(form:any){
    return this.http.post(this.APIURL+"SignupWithSocialAccount",form);
  }

  checkPassportNo(passportno:string){
    return this.http.get<string>(this.APIURL+"CheckPassportNo?passportno="+passportno);
  }

  getShortDetailByEmail(email:string){
    return this.http.get<any>(this.APIURL+"GetShortDetailByEmail?email="+email);
  }

  updateEmergencyInfo(data:any){
    return this.http.post(this.APIURL+"UpdateEmergencyInfo",data);
  }

  view(StudentId: number) {
    return this.http.post<any>(this.APIURL + "View?StudentId=" + StudentId, {});
  }

}
