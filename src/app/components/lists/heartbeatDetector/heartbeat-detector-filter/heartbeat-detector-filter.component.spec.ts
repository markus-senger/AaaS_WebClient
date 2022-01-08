import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatDetectorFilterComponent } from './heartbeat-detector-filter.component';

describe('HeartbeatDetectorFilterComponent', () => {
  let component: HeartbeatDetectorFilterComponent;
  let fixture: ComponentFixture<HeartbeatDetectorFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartbeatDetectorFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatDetectorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
