import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsConfirmedComponent } from './events-confirmed.component';

describe('EventsConfirmedComponent', () => {
  let component: EventsConfirmedComponent;
  let fixture: ComponentFixture<EventsConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
