import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInstanceFilterComponent } from './client-instance-filter.component';

describe('ClientInstanceFilterComponent', () => {
  let component: ClientInstanceFilterComponent;
  let fixture: ComponentFixture<ClientInstanceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientInstanceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInstanceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
