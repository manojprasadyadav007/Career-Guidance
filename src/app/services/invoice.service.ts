import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  APIURL: string = environment.apiurl + "Invoice/";

  constructor(private http: HttpClient) { }

  institutionForMapCommission(agentId: number) {
    return this.http.get<any[]>(this.APIURL + "InstitutionForMapCommission?AgentId=" + agentId, {});
  }

  institutionForPendingInvoice(agentId: number) {
    return this.http.get<any[]>(this.APIURL + "InstitutionForPendingInvoice?AgentId=" + agentId, {});
  }


  pendingApplication(data: any) {
    return this.http.post<any[]>(this.APIURL + "pendingApplication", data);
  }

  add(Deposites: number[]) {
    return this.http.post<any>(this.APIURL + "Add", { Deposits: Deposites });
  }

  list(data: any) {
    return this.http.post<any[]>(this.APIURL + "List", data);
  }

  print(invoiceId: number) {
    return this.http.post<string>(this.APIURL + "Print", { InvoiceId: invoiceId });
  }

  invoiceFormatAll() {
    return this.http.post<any[]>(this.APIURL + "InvoiceFormatAll", {});
  }

  statusUpdate(data: any) {
    return this.http.post<string>(this.APIURL + "statusUpdate", data);
  }

  delete(invoiceId: number) {
    return this.http.post<string>(this.APIURL + "Delete?InvoiceId=" + invoiceId, {});
  }

  mapCommission(data: any) {
    return this.http.post<any[]>(this.APIURL + "MapCommission", data);
  }

  approveCommission(Deposites: any[]) {
    return this.http.post<string>(this.APIURL + "ApproveCommission", { Deposits: Deposites });
  }

  commissionRemarkUpdate(data: any) {
    return this.http.post<string>(this.APIURL + "CommissionRemarkUpdate", data);
  }

  get(invoiceId: number) {
    return this.http.get<any>(this.APIURL + "Get?InvoiceId=" + invoiceId);
  }

  queryCount(transactionId: number) {
    return this.http.get<any>(this.APIURL + "QueryCount?TransactionId="+transactionId);
  }
}
