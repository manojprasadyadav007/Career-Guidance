import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeCentreDetailComponent } from './knowledge-centre-detail.component';

describe('KnowlegeCentreDetailComponent', () => {
  let component: KnowledgeCentreDetailComponent;
  let fixture: ComponentFixture<KnowledgeCentreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeCentreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeCentreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
