import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatDetectorListComponent } from './heartbeat-detector-list.component';

describe('HeartbeatDetectorListComponent', () => {
  let component: HeartbeatDetectorListComponent;
  let fixture: ComponentFixture<HeartbeatDetectorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartbeatDetectorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatDetectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
