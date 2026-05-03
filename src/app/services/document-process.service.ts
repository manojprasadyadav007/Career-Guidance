import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentProcessService {

  APIURL:string= environment.apiurl+"DocumentProcess/";

  constructor(private http:HttpClient) { }

  submit(requestid:string){
    return this.http.post(this.APIURL+"Submit?requestid="+requestid,{});
  }

  cancel(requestid:string){
    return this.http.post(this.APIURL+"Cancel?requestid="+requestid,{});
  }

}
