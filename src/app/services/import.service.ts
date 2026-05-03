import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  APIURL:string= environment.apiurl+"Import/";

  constructor(private http:HttpClient) { }

  template(templatename:string){
    return this.http.post<any[]>(this.APIURL+"Template",{ type:templatename });
  }

  columns(filename:string){
    return this.http.post<any[]>(this.APIURL+"Columns",{filename:filename});
  }

  import(templatename:string,filename:string,data:any){
    return this.http.post<any>(this.APIURL+"Import",{ type:templatename,filename:filename,data:data });
  }
}
