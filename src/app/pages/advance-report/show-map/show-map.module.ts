import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'environments/environment';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { ShowMapComponent } from './show-map.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByModule } from 'app/custom-pipes/string-filter-by/string-filter-by.module';
import { TrackByPropertyModule } from 'app/directive/track-by-property/track-by-property.module';


@NgModule({
  declarations: [ShowMapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.keys.gmap,
  }),
  ComponentsModule,
  RouterModule.forChild([{
    path:'',component:ShowMapComponent
  }]),
  NgxMatSelectSearchModule,
  StringFilterByModule,
  TrackByPropertyModule
  ]
})
export class ShowMapModule { }
