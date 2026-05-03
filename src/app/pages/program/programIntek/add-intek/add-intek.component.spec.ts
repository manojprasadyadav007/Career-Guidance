import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntekComponent } from './add-intek.component';

describe('AddIntekComponent', () => {
  let component: AddIntekComponent;
  let fixture: ComponentFixture<AddIntekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIntekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
