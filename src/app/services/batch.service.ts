import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  APIURL:string= environment.apiurl+"Batch/";

  constructor(private http:HttpClient) { }
  
  list(batchType:string){
    return this.http.get<any[]>(this.APIURL+"List?BatchType="+batchType);
  }

  getData(BatchId:number){
    return this.http.get<any[]>(this.APIURL+"GetData?BatchId="+BatchId);
  }

  agentCommissionUpload(institutionId:number,data:any[]){
    return this.http.post<String>(this.APIURL+"AgentCommissionUpload",{InstitutionId:institutionId,data:data});
  }
}
