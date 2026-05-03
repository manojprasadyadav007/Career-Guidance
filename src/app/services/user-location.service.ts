import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  
  APIURL:string= environment.apiurl+"UserLocation/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post<any>(this.APIURL+"Add",form);
  }

  forMap(form:any){
    return this.http.post<any>(this.APIURL+"ForMap",form);
  }
}
