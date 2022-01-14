import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetectorComponent } from './add-detector.component';

describe('AddDetectorComponent', () => {
  let component: AddDetectorComponent;
  let fixture: ComponentFixture<AddDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
