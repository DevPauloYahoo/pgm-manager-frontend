import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { bounceIn } from 'ng-animate';
import { Observable, take, tap } from 'rxjs';

import { UserService } from '../../../auth/services/user.service';
import { ModalMessagesService } from '../../../core/services/modal-messages.service';
import { ToastMessageService } from '../../../core/services/toast-message.service';
import { VisitsService } from '../../../visits/services/visits.service';
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
  bounce: any;
  @Input() visitors$: Observable<TypeResponseVisitor<Visitor>> = new Observable<
    TypeResponseVisitor<Visitor>
  >();

  @Output() addVisit = new EventEmitter<TypeVisitor>();
  @Output() paginatorChange = new EventEmitter<number>();
  @Output() tableSizeChange = new EventEmitter<number>();

  tableSizes: number[] = [5, 10, 15];

  constructor(
    private readonly useService: UserService,
    private readonly visitService: VisitsService,
    private readonly modalMessageService: ModalMessagesService,
    private readonly messageService: ToastMessageService
  ) {}

  onPaginatorChange(event: Event | any) {
    this.paginatorChange.emit(event);
  }

  onTableSizeChange(event: Event | any) {
    this.tableSizeChange.emit(event);
  }

  onAddVisit(visitor: TypeVisitor) {
    this.visitService
      .getVisitByVisitorId(visitor.id as string)
      .pipe(
        tap(visit => {
          if (visit.status) {
            this.modalMessageService.modalVisitActive(
              visit.visitorName as string,
              visit.badgeNumber as string,
              visit.secretaryName as string
            );
          } else {
            console.log('onAddVisit', visitor);
            this.addVisit.emit(visitor);
          }
        })
      )
      .pipe(take(1))
      .subscribe();
  }

  isExistRole(roles: string[]) {
    return this.useService.verifyRoles(roles);
  }

  onDeleteVisit(visitor: Visitor) {
    this.messageService.toastSuccess('Visitante removido com sucesso');
    console.log(visitor);
  }
}
