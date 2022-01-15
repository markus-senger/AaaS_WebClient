import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDetectorComponent } from './remove-detector.component';

describe('RemoveDetectorComponent', () => {
  let component: RemoveDetectorComponent;
  let fixture: ComponentFixture<RemoveDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveDetectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
