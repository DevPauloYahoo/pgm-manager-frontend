import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./auth/sign-in/sign-in.module').then(m => m.SignInModule),
  },

  {
    path: 'visitors',
    loadChildren: () =>
      import('./visitors/visitors.module').then(m => m.VisitorsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'visits',
    loadChildren: () =>
      import('./visits/visits.module').then(m => m.VisitsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
