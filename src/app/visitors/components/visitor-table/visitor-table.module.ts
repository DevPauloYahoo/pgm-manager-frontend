import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormModalModule } from '../../../visits/components/form-visit-modal/form-modal.module';
import { VisitorTableComponent } from './visitor-table.component';

@NgModule({
  declarations: [VisitorTableComponent],
  imports: [
    CommonModule,
    CoreModule,
    NgxPaginationModule,
    SweetAlert2Module.forChild(),
    FormModalModule,
    SharedModule,
  ],
  exports: [VisitorTableComponent],
})
export class VisitorTableModule {}
