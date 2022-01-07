import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInstanceListComponent } from './client-instance-list.component';

describe('ClientInstanceComponent', () => {
  let component: ClientInstanceListComponent;
  let fixture: ComponentFixture<ClientInstanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientInstanceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInstanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
