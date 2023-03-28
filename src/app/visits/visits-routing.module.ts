import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authFnGuard } from '../auth/guards/auth-fn.guard';
import { VisitListResolver } from './resolvers/visit-list/visit-list.resolver';
import { VisitsComponent } from './visits.component';

const routes: Routes = [
  {
    path: '',
    component: VisitsComponent,
    resolve: {
      visits$: VisitListResolver,
    },
    canActivate: [authFnGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitsRoutingModule {}
