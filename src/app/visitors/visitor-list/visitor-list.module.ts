import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { VisitorModalComponent } from './visitor-form-modal/visitor-modal.component';
import { VisitorListComponent } from './visitor-list.component';
import { VisitorTableComponent } from './visitor-table/visitor-table.component';

@NgModule({
  declarations: [
    VisitorListComponent,
    VisitorTableComponent,
    VisitorModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class VisitorListModule {}
