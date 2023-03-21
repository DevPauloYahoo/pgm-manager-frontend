import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';
import { VisitTableComponent } from './visit-table.component';

@NgModule({
  declarations: [VisitTableComponent],
  imports: [CommonModule, NgxPaginationModule, MaterialModule, SharedModule],
  exports: [VisitTableComponent],
})
export class VisitTableModule {}
