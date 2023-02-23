import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';

import { VisitsService } from '../../visits/services/visits.service';
import { VisitFormModalComponent } from '../../visits/visit-list/visit-form-modal/visit-form-modal.component';
import { Visitor } from '../models/visitor.interface';
import { VisitorsService } from '../services/visitors.service';
import {
  TypePageableVisitor,
  TypeResponseVisitor,
  TypeVisitor,
  TypeVisitToVisitor,
} from '../types/visitor.type';
import { VisitorModalComponent } from './visitor-form-modal/visitor-modal.component';

@Component({
  selector: 'pgm-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit {
  visitors$: Observable<TypeResponseVisitor<Visitor>> = new Observable();
  dataPagination: TypePageableVisitor = {
    limit: 0,
    page: 0,
  };

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

  // cria um atendimento para um visitante existente
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

  // cria um visitante com atendimento ou não
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

  private createVisitor(data: TypeVisitor) {
    this.visitorsService
      .createVisitor(data)
      .pipe(
        tap(() => {
          this.getVisitors(this.dataPagination);
          console.log('SALVOU...');
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  private createVisitToVisitor(data: TypeVisitToVisitor) {
    this.visitorsService.createVisitToVisitor(data).pipe(take(1)).subscribe();
    this.router.navigate(['visits']);
  }
}
