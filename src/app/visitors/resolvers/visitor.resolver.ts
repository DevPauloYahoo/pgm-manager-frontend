import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Visitor } from '../models/visitor.interface';
import { VisitorsService } from '../services/visitors.service';

@Injectable({
  providedIn: 'root',
})
export class VisitorResolver implements Resolve<Visitor> {
  constructor(private visitorsService: VisitorsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Visitor> {
    const visitorId = route.params['id'];
    return this.visitorsService.getById(visitorId);
  }
}
