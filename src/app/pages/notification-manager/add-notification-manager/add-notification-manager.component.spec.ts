import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotificationManagerComponent } from './add-notification-manager.component';

describe('AddNotificationManagerComponent', () => {
  let component: AddNotificationManagerComponent;
  let fixture: ComponentFixture<AddNotificationManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNotificationManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotificationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
