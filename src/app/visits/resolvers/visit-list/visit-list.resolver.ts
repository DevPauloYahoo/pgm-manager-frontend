import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { VisitModel } from '../../model/visit.model';
import { VisitsService } from '../../services/visits.service';
import { TypePageableVisit, TypeResponseVisit } from '../../types/visit.type';

@Injectable({
  providedIn: 'root',
})
export class VisitListResolver
  implements Resolve<Observable<TypeResponseVisit<VisitModel>>>
{
  dataRequest: Partial<TypePageableVisit> = {
    search: '',
    status: false,
  };

  constructor(private readonly visitsService: VisitsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TypeResponseVisit<VisitModel>> {
    return this.visitsService.getVisits(this.dataRequest);
  }
}
