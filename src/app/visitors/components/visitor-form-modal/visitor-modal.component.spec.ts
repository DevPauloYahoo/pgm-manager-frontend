import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorModalComponent } from './visitor-modal.component';

describe('VisitorModalComponent', () => {
  let component: VisitorModalComponent;
  let fixture: ComponentFixture<VisitorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitorModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
