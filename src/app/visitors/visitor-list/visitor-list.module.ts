import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { MaterialModule } from '../../shared/material.module';
import { VisitorListComponent } from './visitor-list.component';
import { VisitorTableComponent } from './visitor-table/visitor-table.component';

@NgModule({
  declarations: [VisitorListComponent, VisitorTableComponent],
  imports: [CommonModule, MaterialModule, NgxPaginationModule],
})
export class VisitorListModule {}
