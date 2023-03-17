import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './auth/home.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SignInComponent,
      },
    ],
  },
  {
    path: 'visitors',
    loadChildren: () =>
      import('./visitors/visitors.module').then(m => m.VisitorsModule),
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
