import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/guards/auth.guard';
import { VisitListResolver } from './resolvers/visit-list/visit-list.resolver';
import { VisitsComponent } from './visits.component';

const routes: Routes = [
  {
    path: '',
    component: VisitsComponent,
    resolve: {
      visits$: VisitListResolver,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitsRoutingModule {}
