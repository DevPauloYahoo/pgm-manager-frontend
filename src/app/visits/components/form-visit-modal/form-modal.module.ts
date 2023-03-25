import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { FormVisitModalComponent } from './form-visit-modal.component';

@NgModule({
  declarations: [FormVisitModalComponent],
  imports: [CommonModule, ReactiveFormsModule, SweetAlert2Module],
  exports: [FormVisitModalComponent],
})
export class FormModalModule {}
