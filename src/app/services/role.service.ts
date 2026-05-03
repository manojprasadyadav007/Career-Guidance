import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Role } from 'app/models/role-model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  APIURL:string= environment.apiurl+"Role/";

  constructor(private http:HttpClient) { }

  add(data:any){
    return this.http.post<any>(this.APIURL+"Add",data);
  }

  update(data:any){
    return this.http.post<any>(this.APIURL+"Update",data);
  }

  delete(roleId:number){
    return this.http.post<any>(this.APIURL+"Delete",{RoleId:roleId});
  }
  
  forDDL(){
    return this.http.post<any[]>(this.APIURL+"DDL",{});
  }

  list(){
    return this.http.post<any[]>(this.APIURL+"List",{});
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
