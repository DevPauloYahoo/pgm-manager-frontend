import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VisitListModule } from './visit-list/visit-list.module';
import { VisitsRoutingModule } from './visits-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, VisitsRoutingModule, VisitListModule],
})
export class VisitsModule {}
