import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  APIURL:string= environment.apiurl+"Upload/";

  constructor(private http:HttpClient) { }
  
  uploadFile(dir:string,file:File){
    var form:FormData = new FormData();
    form.append('dir',dir);
    form.append('image',file,file.name);
    return this.http.post<any[]>(this.APIURL+"File",form,{
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadFileWithoutProgress(dir:string,file:File){
    var form:FormData = new FormData();
    form.append('dir',dir);
    form.append('image',file,file.name);
    return this.http.post<any[]>(this.APIURL+"File",form);
  }
}
