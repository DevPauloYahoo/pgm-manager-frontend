import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VisitorFormComponent } from './visitor-form/visitor-form.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorListComponent,
  },
  {
    path: 'visitor-form',
    component: VisitorFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsRoutingModule {}
