import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Visitor } from '../../models/visitor.interface';
import { TypeVisitorPaginator } from '../../types/visitor.type';

@Component({
  selector: 'pgm-visitor-table',
  templateUrl: './visitor-table.component.html',
  styleUrls: ['./visitor-table.component.css'],
})
export class VisitorTableComponent {
  @Input() visitors$: Observable<TypeVisitorPaginator<Visitor>> =
    new Observable<TypeVisitorPaginator<Visitor>>();

  @Output() paginatorChange = new EventEmitter<number>();

  onPaginatorChange(event: number) {
    this.paginatorChange.emit(event);
  }
}
