import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  distinctUntilChanged,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { UserService } from '../auth/services/user.service';
import { ToastMessageService } from '../core/services/toast-message.service';
import { VisitFormModalComponent } from '../visits/components/visit-form-modal/visit-form-modal.component';
import { FormVisitModalService } from '../visits/services/form-visit-modal.service';
import { VisitsService } from '../visits/services/visits.service';
import { VisitorModalComponent } from './components/visitor-form-modal/visitor-modal.component';
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
export class VisitorsComponent implements OnInit {
  visitors$: Observable<TypeResponseVisitor<Visitor>> = new Observable<
    TypeResponseVisitor<Visitor>
  >();
  debounce$: Subject<string> = new Subject<string>();
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
    private readonly messageService: ToastMessageService,
    private readonly formVisitModalService: FormVisitModalService,
    private readonly formVisitorModalService: FormVisitorModalService,
    private dialog: MatDialog,
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

  // show modal to create new visit for existing visitor
  onShowModalCreateVisitToVisitor(visitor: TypeVisitor) {
    const visitorRest = {
      id: visitor.id,
      name: visitor.name,
      document: visitor.document,
    };
    const dialogRef = this.dialog.open(VisitFormModalComponent, {
      data: visitorRest,
      width: '600px',
      disableClose: true,
      position: {
        top: '100px',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((data: TypeVisitToVisitor) => {
          if (data) {
            this.createVisitToVisitor(data);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  // show modal to create new visitor
  onShowModalCreateVisitor() {
    const dialogRef = this.dialog.open(VisitorModalComponent, {
      width: '600px',
      disableClose: true,
      position: {
        top: '100px',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        tap((data: TypeVisitor) => {
          if (data) {
            this.createVisitor(data);
          }
        }),
        take(1)
      )
      .subscribe();
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
          this.messageService.toastSuccess('Visitante cadastrado com sucesso');
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
          this.messageService.toastSuccess(
            'Atendimento cadastrado com sucesso'
          );
        },
      });
  }
}
