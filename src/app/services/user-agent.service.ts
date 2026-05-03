import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from 'app/models/user-model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserAgentService {

    APIURL: string = environment.apiurl + "UserAgent/";

    constructor(private http: HttpClient) { }


    //      getAssignedAgentList(keyword: string, countryId: any, provinceId: any) {
    //     return this.http.post<any[]>(this.APIURL + "ListByFilter", { keyword: keyword, CountryId: countryId, ProvinceId: provinceId });
    //   }

    getAgentByUserId(uId) {
        return this.http.get<any[]>(this.APIURL + "List?UserId=" + uId);
    }

    assignAgent(UserId, AgentId, RegionId) {
        return this.http.post<any>(this.APIURL + "Add", { UserId: UserId, AgentId: AgentId, RegionId: RegionId })
    }

    deleteassignAgent(UserId, AgentId) {
        return this.http.post(this.APIURL + 'Delete?UserId=' + UserId + '&AgentId=' + AgentId, {});
    }


    assignBulkAgent(UserId, AgentId, RegionId) {
        return this.http.post<any>(this.APIURL + "AssignAgentBulk", { UserId: UserId, AgentId: AgentId, RegionId: RegionId })
    }

    deleteBulkAssignAgent(UserId, AgentId) {
        return this.http.post(this.APIURL + 'DeleteAgentBulk',  { UserId: UserId, AgentId: AgentId });
    }


    updateAssignedAgent(UserId, AgentId, RegionId) {
        return this.http.post<any>(this.APIURL + "Update", { UserId: UserId, AgentId: AgentId, RegionId: RegionId })
    }

}

