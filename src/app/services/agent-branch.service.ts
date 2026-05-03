import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentBranchService {

  APIURL: string = environment.apiurl + "/Branch/";

  constructor(private http: HttpClient) { }

  add(form: any) {
    return this.http.post(this.APIURL + "Add", form);
  }

  update(form: any) {
    return this.http.post(this.APIURL + "Update", form);
  }


  delete(BrachId: number) {
    return this.http.post(this.APIURL + "Delete?BranchId=" + BrachId, {});
  }

  list(AgentId: number) {
    return this.http.get<any[]>(this.APIURL + "List?AgentId=" + AgentId);
  }

  get(branchId: number) {

    return this.http.get<any>(this.APIURL + "Get?BranchId=" + branchId);
  }
 
}
