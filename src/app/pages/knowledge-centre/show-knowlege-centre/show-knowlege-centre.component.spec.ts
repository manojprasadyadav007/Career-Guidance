import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowKnowlegeCentreComponent } from './show-knowlege-centre.component';

describe('ShowKnowlegeCentreComponent', () => {
  let component: ShowKnowlegeCentreComponent;
  let fixture: ComponentFixture<ShowKnowlegeCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowKnowlegeCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowKnowlegeCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
