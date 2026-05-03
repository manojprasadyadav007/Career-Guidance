import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasoningDialogboxComponent } from './reasoning-dialogbox.component';

describe('ReasoningDialogboxComponent', () => {
  let component: ReasoningDialogboxComponent;
  let fixture: ComponentFixture<ReasoningDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasoningDialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasoningDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
