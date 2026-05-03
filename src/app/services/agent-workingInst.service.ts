import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AgentWorkingInstService {

    APIURL: string = environment.apiurl + "AgentWorkingInst/";

    constructor(private http: HttpClient) { }

    list(AgentId: number) {
        return this.http.get<any[]>(this.APIURL + "List?AgentId=" + AgentId);
    }

    add(form: any) {
        return this.http.post<any>(this.APIURL + "Add", form);
    }

    delete(form: any) {
        return this.http.post<any>(this.APIURL + "Delete", form);
    }

}
