import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentDocumentService {

  APIURL:string= environment.apiurl+"StudentDocument/";

  constructor(private http:HttpClient) { }

  add(form:any){
    return this.http.post(this.APIURL+"Add",form);
  }


  delete(DocumentId:number){
    return this.http.post(this.APIURL+"Delete?DocumentId="+DocumentId,{});
  }

  list(ParentId:number,ParentType:number){
    return this.http.get<any[]>(this.APIURL+"List?ParentId="+ParentId+"&ParentType="+ParentType);
  }

  statusUpdate(data: any) {
    return this.http.post(this.APIURL + "StatusUpdate", data);
  }

  downloadDocument(ParentId:number,ParentType:number){
    return this.http.get(this.APIURL+"DownloadSingleFile?ParentId="+ParentId+"&ParentType="+ParentType,{responseType: 'blob'});
  }
// In addBulk Api the data should be in the format specified and in order. 
//{ParentId:number,ParentType:number,Documents:[{DocPath:string,DocumentType:number}]}
  addBulk(data: any) {
    return this.http.post(this.APIURL + "AddBulk", data);
  }

  AddBulkWithName(data: any) {
    return this.http.post(this.APIURL + "AddBulkWithName", data);
  }

  downloadFile(DocumentId:number,ParentId:number,dir:string){
    return this.http.get(this.APIURL+"DownloadFile?ParentId="+ParentId+"&DocumentId="+DocumentId+"&dir="+dir);
  }
 // StudentDocument/ReceiveStatusUpdate
 receiveStatusUpdate(data:any){
  return this.http.post(this.APIURL + "ReceiveStatusUpdate", data);
 }
}
