import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramFilterDisplayComponent } from './program-filter-display.component';
import { ProgramFilterDisplayDialogComponent } from './program-filter-display-dialog/program-filter-display-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MinValueModule } from 'app/directive/custom-validator/min-value/min-value.module';
import { MaxValueModule } from 'app/directive/custom-validator/max-value/max-value.module';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { RemoveSpacesModule } from 'app/directive/remove-spaces/removespaces.module'
import { DxRangeSliderModule } from 'devextreme-angular/ui/range-slider';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [ProgramFilterDisplayComponent, ProgramFilterDisplayDialogComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MinValueModule,
    MaxValueModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSlideToggleModule,
    Ng5SliderModule, NgxMatSelectSearchModule, StringFilterByModule, TrackByPropertyModule, RemoveSpacesModule,
    DxRangeSliderModule,
  ],
  exports: [ProgramFilterDisplayComponent],
  entryComponents: [ProgramFilterDisplayDialogComponent]
})
export class ProgramFilterDisplayModule { }
