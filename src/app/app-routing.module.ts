import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
