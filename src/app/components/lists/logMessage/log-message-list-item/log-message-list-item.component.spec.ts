import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMessageListItemComponent } from './log-message-list-item.component';

describe('LogMessageListItemComponent', () => {
  let component: LogMessageListItemComponent;
  let fixture: ComponentFixture<LogMessageListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogMessageListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMessageListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
