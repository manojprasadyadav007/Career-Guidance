import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { InvoicePaymentComponent } from './invoice-payment/invoice-payment.component';
import { ComponentsModule } from 'app/components/components.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MapInvoiceCommissionComponent } from './map-invoice-commission/map-invoice-commission.component';
import { DisplayQueriesAttachmentsComponent } from './display-queries-attachments/display-queries-attachments.component';
import { ActivityModule } from '../activity/activity.module';
import { StudentDocumentModule } from '../students/student-document/student-document.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DisplayInvoiceComponent } from './display-invoice/display-invoice.component';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { MatMenuModule } from '@angular/material/menu';
import { PrintModule } from 'app/pages/print/print.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';


@NgModule({
  declarations: [GenerateInvoiceComponent, ViewInvoiceComponent, InvoicePaymentComponent, MapInvoiceCommissionComponent, DisplayQueriesAttachmentsComponent, DisplayInvoiceComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    InvoiceRoutingModule,
    ComponentsModule,
    DxDataGridModule,
    NgxMatSelectSearchModule,
    StringFilterByModule,
    TrackByPropertyModule,
    ActivityModule,
    StudentDocumentModule,
    MatDialogModule,
    MatMenuModule,
    DxPopupModule,
    DxDataGridModule,
    PrintModule
  ],
  entryComponents: [InvoicePaymentComponent, DisplayQueriesAttachmentsComponent]
})
export class InvoiceModule { }
