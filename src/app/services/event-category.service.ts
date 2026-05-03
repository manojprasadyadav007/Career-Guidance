import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventCategoryService {

  APIURL:string= environment.apiurl+"EventCategory/";

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<any[]>(this.APIURL+"List");
  }
}
