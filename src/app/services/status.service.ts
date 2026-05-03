import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  APIURL: string = environment.apiurl + "Status/";

  constructor(private http: HttpClient) { }

  add(form: any) {
    return this.http.post(this.APIURL + "Add", form);
  }

  update(form: any) {
    return this.http.post(this.APIURL + "Update", form);
  }

  list(type:number,instittuionId:number) {
    return this.http.get<any[]>(this.APIURL + "List?Type="+type+"&InstitutionId="+instittuionId);
  }

  get(type:number,statusId:number) {
    return this.http.get<any>(this.APIURL + "Get?Type="+type+"&StatusId="+statusId);
  }

  delete(type:number,value: number) {
    return this.http.post<any>(this.APIURL + "Delete?Type="+type+"&StatusId="+value,{});
  }
}
