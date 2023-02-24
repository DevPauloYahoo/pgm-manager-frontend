import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { VisitTableComponent } from './visit-table.component';

@NgModule({
  declarations: [VisitTableComponent],
  imports: [CommonModule, NgxPaginationModule],
  exports: [VisitTableComponent],
})
export class VisitTableModule {}
