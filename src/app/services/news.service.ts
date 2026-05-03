import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  APIURL:string= environment.apiurl+"News/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(NewsId:number){
    return this.http.post(this.APIURL+"Delete?NewsId="+NewsId,{});
  }

  list(){
    return this.http.post<any[]>(this.APIURL+"List",{
    });
  }

  get(NewsId:number){
    return this.http.get<any>(this.APIURL+"Get?NewsId="+NewsId);
  }
}
