import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDesciplinesComponent } from './show-desciplines.component';

describe('ShowDesciplinesComponent', () => {
  let component: ShowDesciplinesComponent;
  let fixture: ComponentFixture<ShowDesciplinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDesciplinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDesciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
