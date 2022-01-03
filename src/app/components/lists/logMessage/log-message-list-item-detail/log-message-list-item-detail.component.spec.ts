import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMessageListItemDetailComponent } from './log-message-list-item-detail.component';

describe('LogMessageListItemDetailComponent', () => {
  let component: LogMessageListItemDetailComponent;
  let fixture: ComponentFixture<LogMessageListItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogMessageListItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogMessageListItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
