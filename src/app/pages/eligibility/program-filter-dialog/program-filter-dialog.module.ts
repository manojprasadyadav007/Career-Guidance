import { NgModule } from "@angular/core";
import { ProgramFilterDialogComponent } from "./program-filter-dialog.component";
import { ComponentsModule } from "app/components/components.module";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';

@NgModule({
    declarations: [ProgramFilterDialogComponent],
    imports: [
      CommonModule,
      ComponentsModule,
      MatListModule, NgxMatSelectSearchModule , StringFilterByModule , TrackByPropertyModule
    ],
    entryComponents:[ProgramFilterDialogComponent]
      })
export class EligibilityModule { }