import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, switchMap, take, tap } from 'rxjs';

import { VisitFormModalComponent } from '../visits/components/visit-form-modal/visit-form-modal.component';
import { VisitsService } from '../visits/services/visits.service';
import { VisitorModalComponent } from './components/visitor-form-modal/visitor-modal.component';
import { Visitor } from './models/visitor.interface';
import { VisitorsService } from './services/visitors.service';
import {
  TypePageableVisitor,
  TypeResponseVisitor,
  TypeVisitor,
  TypeVisitToVisitor,
} from './types/visitor.type';

declare let window: any;

@Component({
  selector: 'pgm-visitor-list',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css'],
})
export class VisitorsComponent implements OnInit {
  visitors$: Observable<TypeResponseVisitor<Visitor>> = new Observable();
  dataPagination: TypePageableVisitor = {
    limit: 0,
    page: 0,
  };

  usedBadges: string[] = [];

  constructor(
    private visitorsService: VisitorsService,
    private visitsService: VisitsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getVisitors(this.dataPagination);
  }

  onChangePage(event: Event | any) {
    this.dataPagination.page = event;
    this.getVisitors(this.dataPagination);
  }

  onTableSizeChange(event: Event | any) {
    this.dataPagination.limit = event.target.value;
    this.dataPagination.page = 1;
    this.getVisitors(this.dataPagination);
  }

  onAddVisitToVisitor(visitor: TypeVisitor) {
    this.onShowModalCreateVisitToVisitor(visitor);
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
            this.usedBadges.push(data.badge);
            this.visitorsService.setUsedBadges(this.usedBadges);
            // this.createVisitToVisitor(data);
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
  private getVisitors(dataPagination: TypePageableVisitor) {
    this.visitors$ = this.visitorsService.getVisitors(dataPagination);
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
      .subscribe();
  }
}