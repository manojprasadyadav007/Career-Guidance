import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProgramPublicComponent } from './search-program-public.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Ng5SliderModule } from 'ng5-slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SelectNationalityDialogModule } from '../select-nationality-dialog/select-nationality-dialog.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { MatInputModule } from '@angular/material';



@NgModule({
  declarations: [SearchProgramPublicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [{path:'',component:SearchProgramPublicComponent}]
    ),
    FormsModule,
    
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    Ng5SliderModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,

    SelectNationalityDialogModule,
    TrackByPropertyModule,
    StringFilterByModule
  ]
})
export class SearchProgramPublicModule { }
