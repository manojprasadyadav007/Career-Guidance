import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InstitutionPageComponent } from './institution-page.component';
import { EmbedVideo } from 'ngx-embed-video';
import { SelectNationalityDialogModule } from '../select-nationality-dialog/select-nationality-dialog.module';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SingleCommaModule } from 'app/directive/singleComma/single-comma.module'
import { MatExpansionModule } from '@angular/material';



@NgModule({
  declarations: [InstitutionPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path:'',component:InstitutionPageComponent}]),
   
    EmbedVideo.forRoot(),
    MatAutocompleteModule,
    MatOptionModule,
    MatIconModule,
    SingleCommaModule,
    SelectNationalityDialogModule,
    MatExpansionModule,
  ]
})
export class InstitutionPageModule { }
