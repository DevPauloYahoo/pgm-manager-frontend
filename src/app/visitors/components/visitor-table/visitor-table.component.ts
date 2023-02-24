import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Visitor } from '../../models/visitor.interface';
import { TypeResponseVisitor, TypeVisitor } from '../../types/visitor.type';

@Component({
  selector: 'pgm-visitor-table',
  templateUrl: './visitor-table.component.html',
  styleUrls: ['./visitor-table.component.css'],
})
export class VisitorTableComponent {
  @Input() visitors$: Observable<TypeResponseVisitor<Visitor>> = new Observable<
    TypeResponseVisitor<Visitor>
  >();

  @Output() addVisit = new EventEmitter<TypeVisitor>();
  @Output() paginatorChange = new EventEmitter<number>();
  @Output() tableSizeChange = new EventEmitter<number>();

  tableSizes: number[] = [5, 10, 15];

  onPaginatorChange(event: Event | any) {
    this.paginatorChange.emit(event);
  }

  onTableSizeChange(event: Event | any) {
    this.tableSizeChange.emit(event);
  }

  onAddVisit(visitor: TypeVisitor) {
    this.addVisit.emit(visitor);
  }
}
