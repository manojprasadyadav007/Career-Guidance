import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class KnowledgeCentreService {

  APIURL:string= environment.apiurl+"KnowledgeCenter/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }

  update(form:any){
    return this.http.post(this.APIURL+"Update",form);
  }

  delete(KnowledgeCID:number){
    return this.http.post(this.APIURL+"Delete?KnowledgeCID="+KnowledgeCID,{});
  }

  get(KnowledgeCID:number){
    return this.http.post<any>(this.APIURL+"Get?KnowledgeCID="+KnowledgeCID, {});
  }

  list(){
    return this.http.get<any[]>(this.APIURL+"List");
  }

  display(id: number) {
    return this.http.get<any[]>(this.APIURL+"Display?id="+id);
  }

  displayList(keyword: string) {
    return this.http.get<any[]>(this.APIURL+"DisplayList?keyword="+keyword);
  }
}




