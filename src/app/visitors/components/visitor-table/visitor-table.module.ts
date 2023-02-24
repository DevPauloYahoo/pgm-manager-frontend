import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { VisitorTableComponent } from './visitor-table.component';

@NgModule({
  declarations: [VisitorTableComponent],
  imports: [CommonModule, NgxPaginationModule],
  exports: [VisitorTableComponent],
})
export class VisitorTableModule {}
