import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDetectorItemComponent } from './metric-detector-item.component';

describe('MetricDetectorItemComponent', () => {
  let component: MetricDetectorItemComponent;
  let fixture: ComponentFixture<MetricDetectorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricDetectorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricDetectorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
