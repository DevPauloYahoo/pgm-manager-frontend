import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { VisitModel } from '../../model/visit.model';
import { TypeResponseVisit } from '../../types/visit.type';

@Component({
  selector: 'pgm-visit-table',
  templateUrl: './visit-table.component.html',
  styleUrls: ['./visit-table.component.css'],
})
export class VisitTableComponent {
  @Input() visits$: Observable<TypeResponseVisit<VisitModel>> =
    new Observable();

  @Input() statusVisits: boolean | string | undefined = false;

  @Output() paginatorChange = new EventEmitter<number>();
  @Output() tableSizeChange = new EventEmitter<number>();

  tableSizes: number[] = [5, 10, 15];

  onPaginatorChange(event: Event | any) {
    this.paginatorChange.emit(event);
  }

  onTableSizeChange(event: Event | any) {
    this.tableSizeChange.emit(event);
  }
}
