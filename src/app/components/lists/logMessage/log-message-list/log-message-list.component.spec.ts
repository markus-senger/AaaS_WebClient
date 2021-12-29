import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMessageListComponent } from './log-message-list.component';

describe('LogMessageListComponent', () => {
  let component: LogMessageListComponent;
  let fixture: ComponentFixture<LogMessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogMessageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
