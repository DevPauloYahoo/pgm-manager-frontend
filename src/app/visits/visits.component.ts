import { Component, OnInit } from '@angular/core';
import { Observable, take, tap } from 'rxjs';

import { VisitModel } from './model/visit.model';
import { VisitsService } from './services/visits.service';
import { TypePageableVisit, TypeResponseVisit } from './types/visit.type';

@Component({
  selector: 'pgm-visit-list',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css'],
})
export class VisitsComponent implements OnInit {
  visits: TypeResponseVisit<VisitModel> = {
    content: [],
    currentPage: 0,
    itemsPerPage: 0,
    totalItems: 0,
  };
  visits$: Observable<TypeResponseVisit<VisitModel>> = new Observable<
    TypeResponseVisit<VisitModel>
  >();
  dataPagination: TypePageableVisit = {
    search: '',
    status: false,
    limit: 0,
    page: 0,
  };

  constructor(private visitsService: VisitsService) {}

  ngOnInit() {
    this.getVisits(this.dataPagination);
  }

  onChangePage(event: Event | any) {
    this.dataPagination.page = event;
    this.getVisits(this.dataPagination);
  }

  onTableSizeChange(event: Event | any) {
    this.dataPagination.limit = event.target.value;
    this.dataPagination.page = 1;
    this.getVisits(this.dataPagination);
  }

  onChangeStatus() {
    this.dataPagination.status = !this.dataPagination.status;
    this.getVisits(this.dataPagination);
  }

  onCloseVisits(event: string) {
    this.visitsService
      .updateStatusVisits(event)
      .pipe(
        tap(() => this.getVisits(this.dataPagination)),
        take(1)
      )
      .subscribe();
  }

  // private methods
  getVisits(dataPagination: TypePageableVisit) {
    this.visits$ = this.visitsService.getVisits(dataPagination);
  }
}
