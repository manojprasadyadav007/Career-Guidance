import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForTrackByPropertyDirective } from './ng-for-track-by-property.directive';



@NgModule({
  declarations: [NgForTrackByPropertyDirective],
  imports: [
    CommonModule
  ],
  exports:[NgForTrackByPropertyDirective],
  
})
export class TrackByPropertyModule { }
