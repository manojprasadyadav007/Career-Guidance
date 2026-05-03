import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentProgramsComponent } from './recent-programs.component';

describe('RecentProgramsComponent', () => {
  let component: RecentProgramsComponent;
  let fixture: ComponentFixture<RecentProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
