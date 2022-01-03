import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMessageFilterComponent } from './log-message-filter.component';

describe('LogMessageFilterComponent', () => {
  let component: LogMessageFilterComponent;
  let fixture: ComponentFixture<LogMessageFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogMessageFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMessageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
