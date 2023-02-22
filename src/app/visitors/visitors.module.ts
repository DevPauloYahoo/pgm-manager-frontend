import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VisitorListModule } from './visitor-list/visitor-list.module';
import { VisitorsRoutingModule } from './visitors-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, VisitorListModule, VisitorsRoutingModule],
})
export class VisitorsModule {}
