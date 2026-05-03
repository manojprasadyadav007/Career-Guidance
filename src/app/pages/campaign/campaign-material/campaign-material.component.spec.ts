import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignMaterialComponent } from './campaign-material.component';

describe('CampaignMaterialComponent', () => {
  let component: CampaignMaterialComponent;
  let fixture: ComponentFixture<CampaignMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
