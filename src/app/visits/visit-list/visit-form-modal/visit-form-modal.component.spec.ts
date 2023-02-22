import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitFormModalComponent } from './visit-form-modal.component';

describe('VisitFormModalComponent', () => {
  let component: VisitFormModalComponent;
  let fixture: ComponentFixture<VisitFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitFormModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisitFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
