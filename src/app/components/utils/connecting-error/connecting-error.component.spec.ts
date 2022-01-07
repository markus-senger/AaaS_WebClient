import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectingErrorComponent } from './connecting-error.component';

describe('ConnectingErrorComponent', () => {
  let component: ConnectingErrorComponent;
  let fixture: ComponentFixture<ConnectingErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectingErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
