import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedApplicationsComponent } from './deleted-applications.component';

describe('DeletedApplicationsComponent', () => {
  let component: DeletedApplicationsComponent;
  let fixture: ComponentFixture<DeletedApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
