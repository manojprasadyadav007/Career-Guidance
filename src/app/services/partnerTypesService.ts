import { Injectable } from '@angular/core';
import { HttpClient  , } from '@angular/common/http';
//import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
// import { RequestOptions } from '@angular/http/src';
// import { Role } from 'app/models/role-model';

@Injectable({
  providedIn: 'root'
})
export class PartnerTypeService {

  APIURL:string= environment.apiurl+"PartnerType/";

  constructor(private http:HttpClient) { }

  add(data:any){
    return this.http.post<any>(this.APIURL+"Add",{PartnerTypeName :data.PartnerTypeName } );
  }

  update(data:any){
    return this.http.post<any>(this.APIURL+"Update",data);
  }

  delete(PartnerTypeId:number){
    // +"Delete?NotificationId="+NotificationId,{})
    return this.http.post<any>(this.APIURL+"Delete?PartnerTypeId="+PartnerTypeId,{});
  }
  
  forDDL(){
    return this.http.post<any[]>(this.APIURL+"DDL",{});
  }

  list(){
    return this.http.get<any[]>(this.APIURL+"List",{});
  }

  listPermission(roleId:number){
    return this.http.post<any[]>(this.APIURL+"PermissionList",{role:roleId});
  }

  updatePermission(roleId:number,permission:any[])
  {
    permission = permission.filter(d=>d.Permission>0).map(d=>{
        return { EntityId:d.EntityId,Permission:d.Permission };
    });
    return this.http.post<string>(this.APIURL+"PermissionUpdate",{role:roleId,permission:permission});
  }

  

}
