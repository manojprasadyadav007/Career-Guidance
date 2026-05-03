import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignActivityAddComponent } from './campaign-activity-add.component';

describe('CampaignActivityAddComponent', () => {
  let component: CampaignActivityAddComponent;
  let fixture: ComponentFixture<CampaignActivityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignActivityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignActivityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
