import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMailFormForCreatingComponent } from './email-form-for-creating.component';

describe('EMailFormForCreatingComponent', () => {
  let component: EMailFormForCreatingComponent;
  let fixture: ComponentFixture<EMailFormForCreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EMailFormForCreatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EMailFormForCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
