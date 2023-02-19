import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VisitorFormModule } from './visitor-form/visitor-form.module';
import { VisitorListModule } from './visitor-list/visitor-list.module';
import { VisitorsRoutingModule } from './visitors-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VisitorListModule,
    VisitorFormModule,
    VisitorsRoutingModule,
  ],
})
export class VisitorsModule {}
