import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { bounceIn } from 'ng-animate';
import { Observable } from 'rxjs';

import { UserService } from '../../../auth/services/user.service';
import { Visitor } from '../../models/visitor.interface';
import { TypeResponseVisitor, TypeVisitor } from '../../types/visitor.type';

@Component({
  selector: 'pgm-visitor-table',
  templateUrl: './visitor-table.component.html',
  styleUrls: ['./visitor-table.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceIn))]),
  ],
})
export class VisitorTableComponent {
  display = 'none';
  bounce: any;
  @Input() visitors$: Observable<TypeResponseVisitor<Visitor>> = new Observable<
    TypeResponseVisitor<Visitor>
  >();

  @Output() addVisit = new EventEmitter<TypeVisitor>();
  @Output() paginatorChange = new EventEmitter<number>();
  @Output() tableSizeChange = new EventEmitter<number>();

  tableSizes: number[] = [5, 10, 15];

  constructor(private readonly useService: UserService) {}

  onPaginatorChange(event: Event | any) {
    this.paginatorChange.emit(event);
  }

  onTableSizeChange(event: Event | any) {
    this.tableSizeChange.emit(event);
  }

  onAddVisit(visitor: TypeVisitor) {
    this.addVisit.emit(visitor);
  }

  isExistRole(roles: string[]) {
    return this.useService.verifyRoles(roles);
  }

  onDeleteVisit(visitor: Visitor) {
    console.log(visitor);
  }
}
