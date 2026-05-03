import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeCentreDisplayComponent } from './knowledge-centre-display.component';

describe('KnowledgeCentreDisplayComponent', () => {
  let component: KnowledgeCentreDisplayComponent;
  let fixture: ComponentFixture<KnowledgeCentreDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeCentreDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeCentreDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
