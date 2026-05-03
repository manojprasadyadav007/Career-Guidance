import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramNewsUpdatesComponent } from './program-news-updates.component';

describe('ProgramNewsUpdatesComponent', () => {
  let component: ProgramNewsUpdatesComponent;
  let fixture: ComponentFixture<ProgramNewsUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramNewsUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramNewsUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
