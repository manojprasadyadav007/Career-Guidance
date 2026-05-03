import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { EventShowComponent } from './event-show/event-show.component';
import { EventModule } from './event.module';

@NgModule({
  imports: [
    EventModule,
    RouterModule.forChild([
      { path: '', component: EventShowComponent, data: { token: 'InstitutitionRoute' } }
    ])]
})
export class EventRoutingModule { } 