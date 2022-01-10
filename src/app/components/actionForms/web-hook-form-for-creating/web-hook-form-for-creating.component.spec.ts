import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebHookFormForCreatingComponent } from './web-hook-form-for-creating.component';

describe('WebHookFormForCreatingComponent', () => {
  let component: WebHookFormForCreatingComponent;
  let fixture: ComponentFixture<WebHookFormForCreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebHookFormForCreatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebHookFormForCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
