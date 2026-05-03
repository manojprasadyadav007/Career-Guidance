import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketingSystemComponent } from './ticketing-system.component';

import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatIconModule, MatDialogModule } from '@angular/material';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'app/components/components.module';
import { SentenceCasePipe } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';

@NgModule({
  declarations: [TicketingSystemComponent, AddTicketComponent,],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,

    DxDataGridModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgxMatSelectSearchModule,

    ComponentsModule,
    StringFilterByModule,
    TrackByPropertyModule,
    RouterModule.forChild([
      { path: '', component: TicketingSystemComponent }]),
  ],
  entryComponents: [AddTicketComponent]
})
export class TicketingSystemModule { }
