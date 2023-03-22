import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { VisitorFormModalModule } from './components/visitor-form-modal/visitor-form-modal.module';
import { VisitorTableModule } from './components/visitor-table/visitor-table.module';
import { FilterSearchVisitorsPipe } from './pipes/filter-search-visitors.pipe';
import { VisitorsRoutingModule } from './visitors-routing.module';
import { VisitorsComponent } from './visitors.component';

@NgModule({
  declarations: [VisitorsComponent, FilterSearchVisitorsPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VisitorFormModalModule,
    VisitorTableModule,
    SharedModule,
    VisitorsRoutingModule,
  ],
})
export class VisitorsModule {}
