import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTodoCalendarComponent } from './my-todo-calendar.component';

describe('MyTodoCalendarComponent', () => {
  let component: MyTodoCalendarComponent;
  let fixture: ComponentFixture<MyTodoCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTodoCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTodoCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
