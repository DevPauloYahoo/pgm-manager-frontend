import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { MaterialModule } from '../../shared/material.module';
import { VisitFormModalComponent } from './visit-form-modal/visit-form-modal.component';
import { VisitListComponent } from './visit-list.component';
import { VisitTableComponent } from './visit-table/visit-table.component';

@NgModule({
  declarations: [
    VisitListComponent,
    VisitTableComponent,
    VisitFormModalComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class VisitListModule {}
