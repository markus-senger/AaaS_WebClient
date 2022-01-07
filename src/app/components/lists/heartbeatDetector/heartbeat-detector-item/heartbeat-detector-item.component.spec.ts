import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatDetectorItemComponent } from './heartbeat-detector-item.component';

describe('HeartbeatDetectorItemComponent', () => {
  let component: HeartbeatDetectorItemComponent;
  let fixture: ComponentFixture<HeartbeatDetectorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartbeatDetectorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatDetectorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
