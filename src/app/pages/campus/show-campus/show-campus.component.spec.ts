import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCampusComponent } from './show-campus.component';

describe('ShowCampusComponent', () => {
  let component: ShowCampusComponent;
  let fixture: ComponentFixture<ShowCampusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCampusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
