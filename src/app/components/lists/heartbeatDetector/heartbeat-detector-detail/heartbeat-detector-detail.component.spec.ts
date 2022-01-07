import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatDetectorDetailComponent } from './heartbeat-detector-detail.component';

describe('HeartbeatDetectorDetailComponent', () => {
  let component: HeartbeatDetectorDetailComponent;
  let fixture: ComponentFixture<HeartbeatDetectorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartbeatDetectorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatDetectorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
