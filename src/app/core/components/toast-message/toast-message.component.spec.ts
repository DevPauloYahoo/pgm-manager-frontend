import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastConfirmationComponent } from './toast-message.component';

describe('ToastConfirmationComponent', () => {
  let component: ToastConfirmationComponent;
  let fixture: ComponentFixture<ToastConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastConfirmationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
