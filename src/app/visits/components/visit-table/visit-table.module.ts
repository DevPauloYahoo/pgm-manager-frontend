import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { MaterialModule } from '../../../shared/material.module';
import { VisitTableComponent } from './visit-table.component';

@NgModule({
  declarations: [VisitTableComponent],
  imports: [CommonModule, NgxPaginationModule, MaterialModule],
  exports: [VisitTableComponent],
})
export class VisitTableModule {}
