import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { MaterialModule } from '../../shared/material.module';
import { VisitorListComponent } from './visitor-list.component';
import { VisitorModalComponent } from './visitor-modal/visitor-modal.component';
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
  ],
})
export class VisitorListModule {}
