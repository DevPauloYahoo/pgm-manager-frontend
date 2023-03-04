import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { Visitor } from '../models/visitor.interface';
import { VisitorsService } from '../services/visitors.service';
import {
  TypePageableVisitor,
  TypeResponseVisitor,
} from '../types/visitor.type';

@Pipe({
  name: 'filterSearchVisitors',
})
export class FilterSearchVisitorsPipe implements PipeTransform {
  teste = false;

  constructor(private visitorsService: VisitorsService) {}

  transform(
    visitor$: Observable<TypeResponseVisitor<Visitor>>,
    searchFilter: string
  ): Observable<TypeResponseVisitor<Visitor>> {
    const dataRequest: Partial<TypePageableVisitor> = {
      search: searchFilter.trim().toLowerCase(),
    };

    if (searchFilter) {
      return this.visitorsService.getVisitors(dataRequest);
    } else {
      return visitor$;
    }
  }
}
