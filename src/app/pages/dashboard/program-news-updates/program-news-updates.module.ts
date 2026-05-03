import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramNewsUpdatesComponent } from './program-news-updates.component';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
@NgModule({
  declarations: [ProgramNewsUpdatesComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    FormsModule,

    RouterModule.forChild([
       {path:'program-updates', component:ProgramNewsUpdatesComponent}
    ]),
    TrackByPropertyModule
  ],
  
   exports:[ProgramNewsUpdatesComponent]
})
export class ProgramNewsUpdatesModule { }
