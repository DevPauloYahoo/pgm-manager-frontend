import { inject, Injectable, Output } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import Swal from 'sweetalert2';

import { UserService } from '../../auth/services/user.service';
import { VisitCloseInterface } from '../../shared/models/shared.model';
import { VisitorsService } from '../../visitors/services/visitors.service';
import { VisitsService } from '../../visits/services/visits.service';
import {
  errorModalHtml,
  modalFinalizeVisitHtml,
  modalRemoveVisitHtml,
  modalTokenExpiredHtml,
  modalVisitActiveHtml,
} from './templates-html-modals';
import { ToastMessageService } from './toast-message.service';

const swalVisitActive = Swal.mixin({
  customClass: {
    actions: 'm-0',
    htmlContainer: 'm-3',
    confirmButton: 'btn btn-primary btn-sm',
    cancelButton: 'btn btn-secondary ms-3 btn-sm',
  },
  buttonsStyling: false,
  background: 'aliceblue',
});

@Injectable({
  providedIn: 'root',
})
export class ModalMessagesService {
  @Output() private statusVisitBehavior = new BehaviorSubject<boolean>(false);
  statusVisit$ = this.statusVisitBehavior.asObservable();
  @Output() private updateVisitorBehavior = new BehaviorSubject<boolean>(false);
  updateVisitor$ = this.updateVisitorBehavior.asObservable();

  private readonly visitService = inject(VisitsService);
  private readonly visitorService = inject(VisitorsService);
  private readonly userService = inject(UserService);
  private readonly toastMessageService = inject(ToastMessageService);

  modalFinalizeVisit(data: VisitCloseInterface) {
    swalVisitActive
      .fire({
        html: modalFinalizeVisitHtml(data),

        confirmButtonText: 'Finalizar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      })
      .then(resul => {
        if (resul.isConfirmed) {
          this.visitService
            .updateStatusVisits(data.id)
            .pipe(
              tap(() => {
                this.statusVisitBehavior.next(true);
                this.toastMessageService.toastSuccess(
                  `Atendimento finalizado com sucesso`
                );
              })
            )
            .pipe(take(1))
            .subscribe();
        }
      });
  }

  modalVisitActive(name: string, badge: string, secretary: string) {
    swalVisitActive.fire({
      html: modalVisitActiveHtml(name, badge, secretary),
    });
  }

  modalTokenExpired(message: string) {
    swalVisitActive
      .fire({
        customClass: {
          confirmButton: 'btn btn-info',
        },
        html: modalTokenExpiredHtml(message),
      })
      .then(result => {
        if (result.isConfirmed) {
          this.userService.invalidAndExpiredAccessToken();
        }
      });
  }

  modalRemoveVisitor(data: { id: string; visitorName: string }) {
    swalVisitActive
      .fire({
        html: modalRemoveVisitHtml(data),
        confirmButtonText: 'Excluir',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      })
      .then(resul => {
        if (resul.isConfirmed) {
          this.visitorService
            .deleteVisitor(data.id)
            .pipe(
              tap(() => {
                this.updateVisitorBehavior.next(true);
                this.toastMessageService.toastSuccess(
                  `Visitante ${data.visitorName} excluído com sucesso`
                );
              })
            )
            .pipe(take(1))
            .subscribe();
        }
      });
  }

  modalErrorMessage(message: string) {
    swalVisitActive.fire({
      customClass: {
        confirmButton: 'btn btn-danger',
      },
      html: errorModalHtml(message),
    });
  }
}
