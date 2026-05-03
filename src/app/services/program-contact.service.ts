import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProgramContact } from 'app/models/program-contact-model';

@Injectable({
  providedIn: 'root'
})
export class ProgramContactService {

  APIURL:string= environment.apiurl+"ProgramContact/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post<string>(this.APIURL+"Add",form);
  }

  delete(Contactid:number){
    return this.http.post(this.APIURL+"Delete?ContactId="+Contactid,{});
  }

  list(ProgramId:number):Observable<ProgramContact[]>{
    return this.http.get<ProgramContact[]>(this.APIURL+"List?ProgramId="+ProgramId);
  }
}
