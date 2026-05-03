import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from 'app/models/user-model';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  APIURL: string = environment.apiurl + "User/";

  constructor(private http: HttpClient,
    private encryptionService: EncryptionService) { }

  add(form: any) {
    return this.http.post<any>(this.APIURL + "Add", form);
  }

  UpdateProfilePath(UserId, ProfilePath) {
    return this.http.post<any>(this.APIURL + "UpdateProfilePath", {
      UserId: UserId,
      ProfilePath: ProfilePath
    });
  }

  update(form: any) {
    return this.http.post<any>(this.APIURL + "Update", form);
  }

  delete(UserId: number, ActionUserId: number) {
    return this.http.post<any>(this.APIURL + "Delete?UserId=" + UserId + "&ActionUserId=" + ActionUserId, {});
  }

  get(UserId: number) {
    return this.http.post<any>(this.APIURL + "Get?UserId=" + UserId, {});
  }

  profileGet() {
    return this.http.post<any>(this.APIURL + "ProfileGet", {});
  }

  linkedInAuth(code : string) {
   return this.http.post<any>(this.APIURL + 'LinkedIn', {code: code});
  }

  statusChange(UserId: number, ActionUserId: number) {
    return this.http.post<any>(this.APIURL + "StatusChange?UserId=" + UserId + "&ActionUserId=" + ActionUserId, {});
  }

  list(keyword: string) {
    return this.http.post<User[]>(this.APIURL + "List", { keyword: keyword });
  }

  checkUserName(UserName: string) {
    return this.http.post<string>(this.APIURL + "CheckUserName", { username: UserName });
  }

  verifyEmail(code: string) {
    return this.http.post<string>(this.APIURL + "VerifyEmail", { code: code });
  }

  changePassword(data: any) {
    let finalData = Object.assign({}, data);
    finalData.NewPassword = this.encryptionService.set(environment.encryptp, data.NewPassword);
    finalData.CurrentPassword = this.encryptionService.set(environment.encryptp, data.CurrentPassword);

    return this.http.post<string>(this.APIURL + "ChangePassword", finalData);
  }

  forgotPassword(data: any) {
    return this.http.post<string>(this.APIURL + "ForgotPassword", data);
  }

  resetPassword(data: any) {
    let finalData = Object.assign({}, data);
    finalData.NewPassword = this.encryptionService.set(environment.encryptp, data.NewPassword);

    return this.http.post<string>(this.APIURL + "ResetPassword", finalData);
  }

  employeeForDDL() {
    return this.http.post<any[]>(this.APIURL + "EmployeeForDDL", {});
  }

  forDDL(rolesIn: string, rolesNotIn: string, institutionId: number, regionId?: number, userId?: number,) {
    return this.http.post<any[]>(this.APIURL + "ForDDL", { ediUserId: userId, rolesIn: rolesIn, rolesNotIn: rolesNotIn, InstitutionId: institutionId, RegionId: regionId });
  }

  accountManager() {
    return this.http.get<any>(this.APIURL + "accountManager");
  }

  forDDLByAgent(rolesIn: string, rolesNotIn: string, AgentId: number) {
    return this.http.post<any[]>(this.APIURL + "ForDDLByAgent", { rolesIn: rolesIn, rolesNotIn: rolesNotIn, AgentId: AgentId });
  }

  listPermission(userId: number) {
    return this.http.post<any[]>(this.APIURL + "PermissionList", { UserId: userId });
  }

  updatePermission(userId: number, permission: any[]) {
    permission = permission.filter(d => d.Permission > 0).map(d => {
      return { EntityId: d.EntityId, Permission: d.Permission };
    });
    return this.http.post<string>(this.APIURL + "PermissionUpdate", { UserId: userId, permission: permission });
  }

  checkSocialSignup(ProviderName: string, ProviderId: string) {
    return this.http.post<string>(this.APIURL + "CheckSocialSignup", { ProviderName: ProviderName, ProviderId: ProviderId });
  }


  forDDLByRoleType(rolesIn: string, rolesNotIn: string, institutionId: number, regionId: number, roleTypeIn: string, roleTypeNotIn: string) {
    return this.http.post<any[]>(this.APIURL + "ForDDLByRoleType", { rolesIn: rolesIn, rolesNotIn: rolesNotIn, InstitutionId: institutionId, RegionId: regionId, roleTypeIn: roleTypeIn, roleTypeNotIn: roleTypeNotIn });
  }

  profileUpdate(form: any) {
    return this.http.post<any>(this.APIURL + "ProfileUpdate", form);
  }

  downTeamForDDL(rolesIn: string, rolesNotIn: string, roleTypeIn: string, roleTypeNotIn: string) {
    return this.http.post<any[]>(this.APIURL + "DownTeamForDDL", { rolesIn: rolesIn, rolesNotIn: rolesNotIn, roleTypeIn: roleTypeIn, roleTypeNotIn: roleTypeNotIn });
  }
  resetPasswordByAdmin(userId: number) {
    return this.http.post<string>(this.APIURL + "ResetPasswordByAdmin", { UserId: userId });
  }

  ViewUpdate(userId: number, view: number) {
    return this.http.post<string>(this.APIURL + "ViewUpdate", { UserId: userId, View: view });
  }
  listByRef(FilterRoleId, FilterRefId) {
    return this.http.post<User[]>(this.APIURL + "listByRef", { "keyword": "", "FilterRoleId": FilterRoleId, "FilterRefId": FilterRefId });

  }

  MarketingManagerForDDL() {
    return this.http.get<any[]>(this.APIURL + "MarketingManagerForDDL", {});
  }

  forDropDownProgramContact(){
    return this.http.get<any[]>(this.APIURL + "ForDropDownProgramContact", {});
  }

}
