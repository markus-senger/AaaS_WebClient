import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDetectorFilterComponent } from './metric-detector-filter.component';

describe('MetricDetectorFilterComponent', () => {
  let component: MetricDetectorFilterComponent;
  let fixture: ComponentFixture<MetricDetectorFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricDetectorFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricDetectorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
