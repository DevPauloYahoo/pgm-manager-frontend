import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VisitFormModalModule } from './components/visit-form-modal/visit-form-modal.module';
import { VisitTableModule } from './components/visit-table/visit-table.module';
import { FilterSearchVisitsPipe } from './pipes/filter-search-visits.pipe';
import { VisitsRoutingModule } from './visits-routing.module';
import { VisitsComponent } from './visits.component';

@NgModule({
  declarations: [VisitsComponent, FilterSearchVisitsPipe],
  imports: [
    CommonModule,
    VisitsRoutingModule,
    VisitFormModalModule,
    VisitTableModule,
    SharedModule,
  ],
})
export class VisitsModule {}
