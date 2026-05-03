import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentDocumentService {


  APIURL: string = environment.apiurl + "DocumentCountry/";

  constructor(private http: HttpClient) { }

  add(form: any) {
    return this.http.post<string>(this.APIURL + "Add", form);
  }

  update(form: any) {
    return this.http.post<string>(this.APIURL + "Update", form);
  }

  delete(DocumentCountryId: number) {
    
    return this.http.post(this.APIURL + "Delete?DocumentCountryId=" + DocumentCountryId, {});
  }

  list() {
    return this.http.get<any[]>(this.APIURL + "List");
  }

  get(DocumentCountryId: number) {
    return this.http.get<any>(this.APIURL + "Get?DocumentCountryId=" + DocumentCountryId);
  }

  listForApplication(countryId:number,ProvinceId:number){
   
    return this.http.get<any>(this.APIURL+"ForDDL?CountryId="+countryId+"&ProvinceId="+ProvinceId);
  }
}
