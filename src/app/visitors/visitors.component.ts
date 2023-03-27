import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  distinctUntilChanged,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { UserService } from '../auth/services/user.service';
import { ModalMessagesService } from '../core/services/modal-messages.service';
import { ToastMessageService } from '../core/services/toast-message.service';
import { FormVisitModalService } from '../visits/services/form-visit-modal.service';
import { VisitsService } from '../visits/services/visits.service';
import { Visitor } from './models/visitor.interface';
import { FormVisitorModalService } from './services/form-visitor-modal.service';
import { VisitorsService } from './services/visitors.service';
import {
  TypePageableVisitor,
  TypeResponseVisitor,
  TypeVisitor,
  TypeVisitToVisitor,
} from './types/visitor.type';

@Component({
  selector: 'pgm-visitor-list',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css'],
})
export class VisitorsComponent implements OnInit, OnDestroy {
  visitors$: Observable<TypeResponseVisitor<Visitor>> = new Observable<
    TypeResponseVisitor<Visitor>
  >();
  debounce$: Subject<string> = new Subject<string>();
  unsubscriptionVisit$?: Subscription;

  searchFilter = '';
  usedBadges: string[] = [];
  dataPagination: Partial<TypePageableVisitor> = {
    search: '',
    limit: 0,
    page: 0,
  };

  constructor(
    private readonly visitorsService: VisitorsService,
    private readonly visitsService: VisitsService,
    private readonly userService: UserService,
    private readonly modalMessage: ModalMessagesService,
    private readonly toastMessageService: ToastMessageService,
    private readonly formVisitModalService: FormVisitModalService,
    private readonly formVisitorModalService: FormVisitorModalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.visitors$ = of(this.activatedRoute.snapshot.data['visitors$']);
    this.debounce$
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (searchValue: string) => {
          this.searchFilter = searchValue;
        },
      });

    this.unsubscriptionVisit$ = this.modalMessage
      .getUpdateVisitorTable()
      .pipe(
        tap(value => {
          if (value) {
            this.visitors$ = this.getVisitors(this.dataPagination);
          }
        })
      )
      .subscribe();
  }

  onChangePage(event: Event | any) {
    this.dataPagination.page = event;
    this.visitors$ = this.getVisitors(this.dataPagination);
  }

  onTableSizeChange(event: Event | any) {
    this.dataPagination.limit = event.target.value;
    this.dataPagination.page = 1;
    this.visitors$ = this.getVisitors(this.dataPagination);
  }

  onAddVisitToVisitor(visitor: TypeVisitor) {
    this.formVisitModalService.setVisitData(visitor);
    this.formVisitModalService.setShowVisitModal();

    this.formVisitModalService
      .getSaveNewVisit()
      .pipe(
        tap(data => {
          this.createVisitToVisitor(data);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  isExistRole(roles: string[]) {
    return this.userService.verifyRoles(roles);
  }

  onShowVisitorCreate() {
    this.formVisitorModalService.setShowVisitorModal();

    this.formVisitorModalService
      .getSaveNewVisitor()
      .pipe(
        tap(data => {
          this.createVisitor(data);
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  ngOnDestroy() {
    this.debounce$.unsubscribe();
    this.unsubscriptionVisit$?.unsubscribe();
  }

  // private methods
  private getVisitors(dataPagination: Partial<TypePageableVisitor>) {
    return this.visitorsService.getVisitors(dataPagination);
  }

  // create new visitor
  private createVisitor(data: TypeVisitor) {
    this.visitors$ = this.visitorsService
      .createVisitor(data)
      .pipe(
        switchMap(() => this.visitorsService.getVisitors(this.dataPagination))
      )
      .pipe(
        tap(() => {
          if (data.visit) {
            this.router.navigate(['visits']);
          }
        })
      )
      .pipe(
        tap(() => {
          this.toastMessageService.toastSuccess(
            'Visitante cadastrado com sucesso'
          );
        })
      );
  }

  // create new visit for existing visitor
  private createVisitToVisitor(data: TypeVisitToVisitor) {
    this.visitorsService
      .createVisitToVisitor(data)
      .pipe(
        tap(() => {
          this.router.navigate(['visits']);
        }),
        take(1)
      )
      .subscribe({
        next: () => {
          this.toastMessageService.toastSuccess(
            'Atendimento cadastrado com sucesso'
          );
        },
      });
  }
}
