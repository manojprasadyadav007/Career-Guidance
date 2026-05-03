import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIntekComponent } from './show-intek.component';

describe('ShowIntekComponent', () => {
  let component: ShowIntekComponent;
  let fixture: ComponentFixture<ShowIntekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIntekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIntekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
