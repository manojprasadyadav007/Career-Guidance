import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { sitemap } from 'app/models/site-map.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  APIURL: string = environment.apiurl + 'ActivityLog/';
  constructor(private http: HttpClient) { }

  activitylog(EntityId, EntityName, ActionType) {
    return this.http.post<any>(this.APIURL + "Add", { EntityId: EntityId, EntityName: EntityName, ActionType: ActionType })
}

}
