import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDetectorListComponent } from './metric-detector-list.component';

describe('MetricDetectorListComponent', () => {
  let component: MetricDetectorListComponent;
  let fixture: ComponentFixture<MetricDetectorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricDetectorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricDetectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
