import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeAddComponent } from './attende-add.component';

describe('AttendeAddComponent', () => {
  let component: AttendeAddComponent;
  let fixture: ComponentFixture<AttendeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
