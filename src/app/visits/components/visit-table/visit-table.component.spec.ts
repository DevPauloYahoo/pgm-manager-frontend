import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitTableComponent } from './visit-table.component';

describe('VisitTableComponent', () => {
  let component: VisitTableComponent;
  let fixture: ComponentFixture<VisitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
