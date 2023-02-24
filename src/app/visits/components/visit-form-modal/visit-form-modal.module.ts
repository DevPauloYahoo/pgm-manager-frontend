import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/material.module';
import { VisitFormModalComponent } from './visit-form-modal.component';

@NgModule({
  declarations: [VisitFormModalComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [VisitFormModalComponent],
})
export class VisitFormModalModule {}
