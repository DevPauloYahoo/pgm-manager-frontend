import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authFnGuard } from '../auth/guards/auth-fn.guard';
import { VisitorListResolver } from './resolvers/visitor-list/visitor-list.resolver';
import { VisitorsComponent } from './visitors.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorsComponent,
    resolve: {
      visitors$: VisitorListResolver,
    },
    canActivate: [authFnGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsRoutingModule {}
