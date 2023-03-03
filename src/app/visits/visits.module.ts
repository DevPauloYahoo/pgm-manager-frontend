import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VisitFormModalModule } from './components/visit-form-modal/visit-form-modal.module';
import { VisitTableModule } from './components/visit-table/visit-table.module';
import { FilterByNameAndDocumentPipe } from './pipes/filter-by-name-and-document.pipe';
import { VisitsRoutingModule } from './visits-routing.module';
import { VisitsComponent } from './visits.component';

@NgModule({
  declarations: [VisitsComponent, FilterByNameAndDocumentPipe],
  imports: [
    CommonModule,
    VisitsRoutingModule,
    VisitFormModalModule,
    VisitTableModule,
  ],
})
export class VisitsModule {}
