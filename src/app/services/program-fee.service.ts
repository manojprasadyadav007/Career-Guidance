import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramFeeService {

  APIURL: string = environment.apiurl + "ProgramFee/";

  constructor(private http: HttpClient) { }

  add(form: any) {
    return this.http.post(this.APIURL + "Add", form);
  }

  update(form: any) {
    return this.http.post(this.APIURL + "Update", form);
  }

  delete(IntekId: number) {
    return this.http.post(this.APIURL + "Delete?FeeId=" + IntekId, {});
  }

  get(IntekId: number) {
    return this.http.get<any>(this.APIURL + "Get?FeeId=" + IntekId, {});
  }

  list(ProgramId: number) {
    return this.http.get<any[]>(this.APIURL + "List?ProgramId=" + ProgramId);
  }

  forApplication(data: any) {
    return this.http.post<any[]>(this.APIURL + "ForApplication",data);
  }
}
