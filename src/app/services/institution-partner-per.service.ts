import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InstitutionPartnerPerService {

    APIURL: string = environment.apiurl + 'InstitutionPartnerPer/';

    constructor(private http: HttpClient) { }


    groupVisibilityList(institutionId: number) {
        return this.http.get<any>(this.APIURL + 'List?InstitutionId=' + institutionId);
    }

    statusUpdate(partnerId, status, institutionId) {
        return this.http.post<any>(this.APIURL + 'Update', { PartnerTypeId: partnerId, Status: status, InstitutionId: institutionId });
    }
}
