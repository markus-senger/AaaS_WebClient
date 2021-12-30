import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeIntervalListComponent } from './time-interval-list.component';

describe('TimeIntervalListComponent', () => {
  let component: TimeIntervalListComponent;
  let fixture: ComponentFixture<TimeIntervalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeIntervalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeIntervalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
