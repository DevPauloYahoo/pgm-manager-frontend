import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { bounceIn } from 'ng-animate';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';

import { ModalMessagesService } from '../../../core/services/modal-messages.service';
import { VisitCloseInterface } from '../../../shared/models/shared.model';
import { VisitModel } from '../../model/visit.model';
import { TypeResponseVisit } from '../../types/visit.type';

@Component({
  selector: 'pgm-visit-table',
  templateUrl: './visit-table.component.html',
  styleUrls: ['./visit-table.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceIn))]),
  ],
})
export class VisitTableComponent {
  bounce: any;
  displayedColumns = ['name', 'document', 'badge', 'secretary'];

  @Input() visits$: Observable<TypeResponseVisit<VisitModel>> =
    new Observable();
  @Input() statusVisits: boolean | string | undefined = false;

  @Output() paginatorChange = new EventEmitter<number>();
  @Output() tableSizeChange = new EventEmitter<number>();

  tableSizes: number[] = [5, 10, 15];

  constructor(
    private readonly useService: UserService,
    private readonly modalMessageService: ModalMessagesService
  ) {}

  openConfirmationModal(data: VisitCloseInterface) {
    this.modalMessageService.modalFinalizeVisit(data);
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
