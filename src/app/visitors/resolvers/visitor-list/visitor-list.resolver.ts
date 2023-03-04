import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

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

  constructor(private visitorsService: VisitorsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TypeResponseVisitor<Visitor>> {
    return this.visitorsService.getVisitors(this.dataRequest);
  }
}
