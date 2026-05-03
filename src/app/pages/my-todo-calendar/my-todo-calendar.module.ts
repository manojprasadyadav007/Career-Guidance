import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'app/components/components.module';
import { TaskModule } from '../task/task.module';
import { EventModule } from '../event/event.module';
import { MyTodoCalendarComponent } from './my-todo-calendar.component';
import { RouterModule } from '@angular/router';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { SentenceCaseModule } from 'app/custom-pipes/sentence-case/sentence-case.module';



@NgModule({
  declarations: [MyTodoCalendarComponent],
  imports: [
    CommonModule,
    SentenceCaseModule,
    ComponentsModule,
    FullCalendarModule,
    EventModule,
    TaskModule,
    RouterModule.forChild([
      { path: '', component: MyTodoCalendarComponent }
    ])
  ]
})
export class MyTodoCalendarModule { }
