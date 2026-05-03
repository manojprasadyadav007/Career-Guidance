import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetrieveService {

  APIURL:string= environment.apiurl+"Retrieve/";

  constructor(private http:HttpClient) { }

  listApplication(data:any)
  {
     return this.http.post<any[]>(this.APIURL+"Application",data);
  }
  retrieve(DeleteId:number,id:number,key:string)
  {
    return this.http.post<string>(this.APIURL+"retrieve",{
      deleteId:DeleteId,
      id:id,
      key:key
    });
  }


}
