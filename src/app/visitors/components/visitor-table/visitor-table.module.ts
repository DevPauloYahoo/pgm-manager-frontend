import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { CoreModule } from '../../../core/core.module';
import { VisitorTableComponent } from './visitor-table.component';

@NgModule({
  declarations: [VisitorTableComponent],
  imports: [CommonModule, CoreModule, NgxPaginationModule],
  exports: [VisitorTableComponent],
})
export class VisitorTableModule {}
