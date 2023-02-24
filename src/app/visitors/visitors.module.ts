import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VisitorFormModalModule } from './components/visitor-form-modal/visitor-form-modal.module';
import { VisitorTableModule } from './components/visitor-table/visitor-table.module';
import { VisitorsRoutingModule } from './visitors-routing.module';
import { VisitorsComponent } from './visitors.component';

@NgModule({
  declarations: [VisitorsComponent],
  imports: [
    CommonModule,
    VisitorsRoutingModule,
    VisitorFormModalModule,
    VisitorTableModule,
  ],
})
export class VisitorsModule {}
