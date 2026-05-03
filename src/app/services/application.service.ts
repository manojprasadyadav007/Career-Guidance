import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Application } from 'app/models/application-model';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  APIURL: string = environment.apiurl + "Application/";

  constructor(private http: HttpClient,
    private encryptionService: EncryptionService) { }

  add(form: any) {
    let finalData = Object.assign({},form);

    if(finalData.genInfo.App_Password) {
      finalData.genInfo.App_Password = this.encryptionService.set(environment.encryptp, finalData.genInfo.App_Password);
    }
    return this.http.post(this.APIURL + "Add", finalData);
  }

  update(form: Application) {
    return this.http.post(this.APIURL + "Update", form);
  }

  delete(applicationId: number) {
    return this.http.post(this.APIURL + "Delete?ApplicationId=" + applicationId, {});
  }

  statusUpdate(form: any) {
    return this.http.post(this.APIURL + "StatusUpdate", form);
  }

  list(keyword: string,status:string) {
    return this.http.post<any[]>(this.APIURL + "List",
      {
        keyword: keyword,status:status
      }
    );
  }

  get(ApplicationId: number) {
    return this.http.post<any>(this.APIURL + "Get?ApplicationId=" + ApplicationId, {});
  }

  getSectionWise(ApplicationId: number) {
    return this.http.post<any>(this.APIURL + "GetSectionWise?ApplicationId=" + ApplicationId, {});
  }

  getStudent(StudentId: number, ProgramId: number) {
    return this.http.post<any>(this.APIURL + "GetStudent?StudentId=" + StudentId + "&ProgramId=" + ProgramId, {});
  }

  initpayment(ApplicationId: number, UserId: number) {
    return this.http.post(this.APIURL + "InitPayment?ApplicationId=" + ApplicationId, {});
  }
  reviewStatusList(){
    return this.http.get<any[]>(this.APIURL + "Review_Status");
  }



  updateAssignee(applicationId: number, assingeeId: number) {
    return this.http.post<any>(this.APIURL + "UpdateAssignee?ApplicationId=" + applicationId + "&AssigneeId=" + assingeeId, {});
  }

  listByStudent(StudentId: number) {
    return this.http.get<any[]>(this.APIURL + "ListByStudent?StudentId=" + StudentId
    );
  }
  submit(applicationId: number) {
    return this.http.post(this.APIURL + "Submit?ApplicationId=" + applicationId, {});
  }

  listDetailed(keyword: string,status:string,intake:string) {
    return this.http.post<any>(this.APIURL + "ListDetailed",
      {
        keyword: keyword,status:status,intake:intake
      }
    );
  }



  enrollmentNoUpdate(applicationId: number,enrollmentNo:string) {
    return this.http.post(this.APIURL + "EnrollmentNoUpdate", {ApplicationId:applicationId,EnrollmentNo:enrollmentNo});
  }

  pendingDocumentCount(applicationId: number) {
    return this.http.post<number>(this.APIURL + "PendingDocumentCount?ApplicationId=" + applicationId, {});
  }

  updateProgramInfo(form: Application) {
    return this.http.post(this.APIURL + "UpdateProgramInfo", form);
  }

  updateGenInfo(form: any) {
    let finalData = Object.assign({},form);
    if(finalData.App_Password) {
      finalData.App_Password = this.encryptionService.set(environment.encryptp, finalData.App_Password);
    }
    return this.http.post(this.APIURL + "UpdateGenInfo", finalData);
  }

  updateEduInfo(form: Application) {
    return this.http.post(this.APIURL + "UpdateEduInfo", form);
  }

  updateTestScore(form: Application) {
    return this.http.post(this.APIURL + "UpdateTestScore", form);
  }



  offerLetterDelete(applicationId: number) {
    return this.http.post(this.APIURL + "OfferLetterDelete?ApplicationId=" + applicationId, {});
  }

  offerLetterUpload(form: any) {
    return this.http.post(this.APIURL + "offerLetterUpload", form);
  }

  submitToInstitute(applicationId: number) {
    return this.http.post(this.APIURL + "SubmitToInstitute?ApplicationId=" + applicationId, {});
  }


  updateOtherInfo(form:any){
    return this.http.post(this.APIURL+"UpdateOtherInfo",form);
  }

  getOtherInfo(ApplicationId:number,InstitutionId:number){
    return this.http.get<any[]>(this.APIURL+"GetOtherInfo?ApplicationId="+ApplicationId+"&InstitutionId="+InstitutionId);
  }

  print(applicationId:number){
    return this.http.get<string>(this.APIURL+"Print?ApplicationId="+applicationId);
  }

  checkInstitutionExists(studentId: number,institutionId:number) {
    return this.http.post<number>(this.APIURL + "CheckInstitutionExists?StudentId=" + studentId+"&InstitutionId="+institutionId, {});
  }

  checkInstitutionIntakeExists(studentId: number,institutionId:number, programId: number, intakeId: number) {
    return this.http.post<number>(this.APIURL + "CheckInstitutionIntakeExists", {  
        InstitutionId:institutionId,
        StudentId:studentId,
        ProgramId:programId,
        IntakeId:intakeId
    });
  }

  updateEmergencyInfo(data:any){
    return this.http.post(this.APIURL+"UpdateEmergencyInfo",data);
  }


  statusFlow(applicationId:number){
    return this.http.get<any[]>(this.APIURL+"StatusFlow?ApplicationId="+applicationId);
  }

  view(ApplicationId: number) {
    return this.http.post<any>(this.APIURL + "View?ApplicationId=" + ApplicationId, {});
  }

  updateAdmissionDetail(parentId: number,parentType:number,updateId,updateType:string) {
    return this.http.post<any>(this.APIURL + "UpdateAdmissionDetail",{parentId:parentId,parentType:parentType,updateId:updateId,updateType:updateType});
  }

  reviewStatusUpdate(applicationId: number,status:boolean) {
    return this.http.post(this.APIURL + "ReviewStatusUpdate", {
      ApplicationId:applicationId,
      ReviewStatus:status
    });
  }

  isPrintAvail(institutionId: number){
    return this.http.get<string>(this.APIURL+"IsPrintAvail?InstitutionId="+institutionId);
  }


  applyForRefund(applicationId: number, refundStatus: number) {
    return this.http.post(this.APIURL + "applyForRefund", {
      ApplicationId: applicationId,
      RefundStatus: refundStatus
    });
  }

  UpdateDeferred(ApplicationId:number,NewIntekid:number,IsDeferred:number)
  {
    return this.http.post(this.APIURL+"Deferred",{
      ApplicationId:ApplicationId,
      NewIntekid:NewIntekid,
      IsDeferred:IsDeferred
    });
  }
}
