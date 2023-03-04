import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VisitorListResolver } from './resolvers/visitor-list/visitor-list.resolver';
import { VisitorsComponent } from './visitors.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorsComponent,
    resolve: {
      visitors$: VisitorListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsRoutingModule {}
