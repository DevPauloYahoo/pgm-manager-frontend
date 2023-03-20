import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, Observable, of, Subject, take, tap } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { UserService } from '../auth/services/user.service';
import { VisitModel } from './model/visit.model';
import { VisitsService } from './services/visits.service';
import { TypePageableVisit, TypeResponseVisit } from './types/visit.type';

@Component({
  selector: 'pgm-visit-list',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css'],
})
export class VisitsComponent implements OnInit, OnDestroy {
  // properties class
  searchFilter = '';
  pipeStatus = false;
  debounce: Subject<string> = new Subject<string>();

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

  constructor(
    private readonly visitsService: VisitsService,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.visits$ = of(this.activatedRoute.snapshot.data['visits$']);
    this.debounce
      .pipe(debounceTime(400))
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (searchValue: string) => {
          this.searchFilter = searchValue;
        },
        error: err => {
          return JSON.stringify({
            status: err.status,
            message: err.error.message,
          });
        },
      });
  }

  onChangePage(event: Event | any) {
    this.dataPagination.page = event;
    this.visits$ = this.getVisits(this.dataPagination);
  }

  onTableSizeChange(event: Event | any) {
    this.dataPagination.limit = event.target.value;
    this.dataPagination.page = 1;
    this.visits$ = this.getVisits(this.dataPagination);
  }

  onChangeStatus() {
    if (this.dataPagination.page > 1) {
      this.dataPagination.page = 1;
    }

    this.dataPagination.status = !this.dataPagination.status;
    this.pipeStatus = !this.pipeStatus;
    this.visits$ = this.getVisits(this.dataPagination);
  }

  onCloseVisits(event: string) {
    this.visitsService
      .updateStatusVisits(event)
      .pipe(
        tap(() => {
          this.visits$ = this.getVisits(this.dataPagination);
        }),
        take(1)
      )
      .subscribe();
  }

  // private methods
  getVisits(dataPagination: TypePageableVisit) {
    return this.visitsService.getVisits(dataPagination);
  }

  ngOnDestroy() {
    this.debounce.unsubscribe();
  }
}
