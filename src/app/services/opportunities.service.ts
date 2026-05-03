import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpportunitiesService {

  APIURL:string= environment.apiurl+"Opportunity/";

  constructor(private http:HttpClient) { }

  list(keyword:string){
    return this.http.get<any[]>(this.APIURL+"List?keyword="+keyword);
  }
 
}
