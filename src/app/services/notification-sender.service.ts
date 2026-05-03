import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationSenderService {

  APIURL:string= environment.apiurl+"NotificationSender/";

  constructor(private http:HttpClient) { }


  forDDL(){
    return this.http.get<any[]>(this.APIURL+"ForDDL");
  }
}
