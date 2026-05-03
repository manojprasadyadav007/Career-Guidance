import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEvaluationFormComponent } from './show-evaluation-form.component';

describe('ShowEvaluationFormComponent', () => {
  let component: ShowEvaluationFormComponent;
  let fixture: ComponentFixture<ShowEvaluationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEvaluationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
