import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {
  APIURL:string= environment.apiurl+"UserNotification/";

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<any>(this.APIURL+"List");
  }
 
}
