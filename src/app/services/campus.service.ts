import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Campus } from 'app/models/campus-model';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  APIURL:string= environment.apiurl+"Campus/";

  constructor(private http:HttpClient) { }
  
  list(cityid:number):Observable<Campus[]>{
    return this.http.get<Campus[]>(this.APIURL+"List?CityId="+cityid);
  }
  
}
