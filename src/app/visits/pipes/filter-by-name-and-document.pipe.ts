import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { VisitModel } from '../model/visit.model';
import { VisitsService } from '../services/visits.service';
import { TypePageableVisit, TypeResponseVisit } from '../types/visit.type';

@Pipe({
  name: 'filterByNameAndDocument',
})
export class FilterByNameAndDocumentPipe implements PipeTransform {
  constructor(private visitsService: VisitsService) {}

  transform(
    visits$: Observable<TypeResponseVisit<VisitModel>>,
    filterQuery: string,
    pipeStatus: boolean
  ) {
    filterQuery = filterQuery.trim().toLowerCase();

    const dataRequest: Partial<TypePageableVisit> = {
      search: filterQuery,
      status: pipeStatus,
    };

    if (filterQuery) {
      return this.visitsService.getVisits(dataRequest);
    } else {
      return visits$;
    }
  }
}
