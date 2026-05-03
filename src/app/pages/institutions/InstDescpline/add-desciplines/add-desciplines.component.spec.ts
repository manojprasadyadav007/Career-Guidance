import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesciplinesComponent } from './add-desciplines.component';

describe('AddDesciplinesComponent', () => {
  let component: AddDesciplinesComponent;
  let fixture: ComponentFixture<AddDesciplinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDesciplinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
