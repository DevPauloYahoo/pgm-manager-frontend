import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';

import { ModalService } from '../../../shared/components/confirmation-modal/modal.service';
import { VisitCloseInterface } from '../../../shared/models/shared.model';
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

  tableSizes: number[] = [5, 10, 15];

  constructor(
    private readonly useService: UserService,
    private readonly modalService: ModalService
  ) {}

  openConfirmationModal(visitClose: VisitCloseInterface) {
    this.modalService.setVisitClose(visitClose);
    this.modalService.setShowModal();
  }

  onPaginatorChange(event: Event | any) {
    this.paginatorChange.emit(event);
  }

  onTableSizeChange(event: Event | any) {
    this.tableSizeChange.emit(event);
  }

  isExistRoles(roles: string[]) {
    return this.useService.verifyRoles(roles);
  }

  onDeleteVisit(visit: VisitModel) {
    console.log(visit);
  }
}
