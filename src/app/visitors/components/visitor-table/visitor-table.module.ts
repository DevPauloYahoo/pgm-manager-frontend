import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

import { CoreModule } from '../../../core/core.module';
import { VisitorTableComponent } from './visitor-table.component';

@NgModule({
  declarations: [VisitorTableComponent],
  imports: [
    CommonModule,
    CoreModule,
    NgxPaginationModule,
    SweetAlert2Module.forChild(),
  ],
  exports: [VisitorTableComponent],
})
export class VisitorTableModule {}
