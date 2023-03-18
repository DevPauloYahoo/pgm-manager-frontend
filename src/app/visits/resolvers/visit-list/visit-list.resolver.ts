import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';

import { UserService } from '../../../auth/services/user.service';
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

  constructor(
    private readonly visitsService: VisitsService,
    private readonly userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TypeResponseVisit<VisitModel>> {
    return this.visitsService.getVisits(this.dataRequest).pipe(
      catchError(err => {
        alert(
          JSON.stringify({ status: err.status, message: err.error.message })
        );
        this.userService.invalidAndExpiredAccessToken(err.status);
        return EMPTY;
      })
    );
  }
}
