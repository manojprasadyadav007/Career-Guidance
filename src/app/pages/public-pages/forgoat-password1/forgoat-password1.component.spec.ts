import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgoatPassword1Component } from './forgoat-password1.component';

describe('ForgoatPassword1Component', () => {
  let component: ForgoatPassword1Component;
  let fixture: ComponentFixture<ForgoatPassword1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgoatPassword1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgoatPassword1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
