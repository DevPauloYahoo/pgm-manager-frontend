import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/material.module';
import { VisitorModalComponent } from './visitor-modal.component';

@NgModule({
  declarations: [VisitorModalComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [VisitorModalComponent],
})
export class VisitorFormModalModule {}
