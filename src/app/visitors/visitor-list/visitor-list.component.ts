import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Visitor } from '../models/visitor.interface';
import { VisitorsService } from '../services/visitors.service';
import {
  TypeDataPagination,
  TypeVisitorPaginator,
} from '../types/visitor.type';

@Component({
  selector: 'pgm-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit {
  visitors$: Observable<TypeVisitorPaginator<Visitor>> = new Observable();
  dataPagination: TypeDataPagination = {
    limit: 2,
    page: 1,
  };

  constructor(private visitorsService: VisitorsService) {}

  ngOnInit(): void {
    this.getVisitors(this.dataPagination);
  }

  onChangePage(event: number) {
    this.dataPagination.page = event;
    this.getVisitors(this.dataPagination);
  }

  // private methods
  getVisitors(dataPagination: TypeDataPagination) {
    this.visitors$ = this.visitorsService.getVisitors(dataPagination);
  }
}
