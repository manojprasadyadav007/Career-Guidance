import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  APIURL: string = environment.apiurl + "Activity/";

  constructor(private http: HttpClient) { }

  add(form: any) {
    return this.http.post(this.APIURL + "Add", form);
  }

  list(ActivityType:number,ActivityId:number){
    return this.http.get<any[]>(this.APIURL+"List?ActivityType="+ActivityType+"&ActivityId="+ActivityId);
  }
  
}
