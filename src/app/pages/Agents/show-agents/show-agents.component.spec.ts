import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgentsComponent } from './show-agents.component';

describe('ShowAgentsComponent', () => {
  let component: ShowAgentsComponent;
  let fixture: ComponentFixture<ShowAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
