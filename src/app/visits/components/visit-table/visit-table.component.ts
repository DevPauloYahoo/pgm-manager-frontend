import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';

import { VisitModel } from '../../model/visit.model';
import { TypeResponseVisit } from '../../types/visit.type';

@Component({
  selector: 'pgm-visit-table',
  templateUrl: './visit-table.component.html',
  styleUrls: ['./visit-table.component.css'],
})
export class VisitTableComponent {
  displayedColumns = ['name', 'document', 'badge', 'secretary'];
  @Input() visits$: Observable<TypeResponseVisit<VisitModel>> =
    new Observable();

  @Input() statusVisits: boolean | string | undefined = false;

  @Output() paginatorChange = new EventEmitter<number>();
  @Output() tableSizeChange = new EventEmitter<number>();
  @Output() closeVisits = new EventEmitter<string>();

  tableSizes: number[] = [5, 10, 15];

  constructor(private readonly useService: UserService) {}

  onPaginatorChange(event: Event | any) {
    this.paginatorChange.emit(event);
  }

  onTableSizeChange(event: Event | any) {
    this.tableSizeChange.emit(event);
  }

  onCloseVisits(id: string) {
    this.closeVisits.emit(id);
  }

  isExistRoles(roles: string[]) {
    return this.useService.verifyRoles(roles);
  }

  onDeleteVisit(visit: VisitModel) {
    console.log(visit);
  }
}
