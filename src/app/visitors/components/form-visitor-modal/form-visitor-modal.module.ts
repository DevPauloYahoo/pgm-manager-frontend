import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { FormVisitorModalComponent } from './form-visitor-modal.component';

@NgModule({
  declarations: [FormVisitorModalComponent],
  imports: [CommonModule, ReactiveFormsModule, SweetAlert2Module],
  exports: [FormVisitorModalComponent],
})
export class FormVisitorModalModule {}
