import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeCategoryService {

  APIURL:string= environment.apiurl+"KnowledgeCategory/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(CategoryId:number){
    return this.http.post(this.APIURL+"Delete?CategoryId="+CategoryId,{});
  }

  get(CategoryId:number){
    return this.http.get<any>(this.APIURL+"Get?CategoryId="+CategoryId, {});
  }

  list(){
    return this.http.get<any[]>(this.APIURL+"List");
  }

  

}
