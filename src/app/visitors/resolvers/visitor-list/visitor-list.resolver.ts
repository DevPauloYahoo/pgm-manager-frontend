import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';

import { UserService } from '../../../auth/services/user.service';
import { Visitor } from '../../models/visitor.interface';
import { VisitorsService } from '../../services/visitors.service';
import {
  TypePageableVisitor,
  TypeResponseVisitor,
} from '../../types/visitor.type';

@Injectable({
  providedIn: 'root',
})
export class VisitorListResolver
  implements Resolve<TypeResponseVisitor<Visitor>>
{
  dataRequest: Partial<TypePageableVisitor> = {
    search: '',
  };

  constructor(
    private visitorsService: VisitorsService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TypeResponseVisitor<Visitor>> {
    return this.visitorsService.getVisitors(this.dataRequest).pipe(
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
