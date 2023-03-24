import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import Swal from 'sweetalert2';

import { VisitCloseInterface } from '../../shared/models/shared.model';
import { VisitsService } from '../../visits/services/visits.service';
import { ToastMessageService } from './toast-message.service';

const swalVisitActive = Swal.mixin({
  customClass: {
    image: 'mb-0 mt-2',
    htmlContainer: 'border border-success',
    title: 'mb-0 mt-0 text-primary',
    confirmButton: 'btn btn-outline-primary',
    cancelButton: 'btn btn-outline-secondary ms-2',
  },
  imageUrl: '/assets/img/logo_2.png',
  imageWidth: 60,
  buttonsStyling: false,
  background: 'aliceblue',
});

@Injectable({
  providedIn: 'root',
})
export class ModalMessagesService {
  @Output() statusVisit: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(
    private readonly visitService: VisitsService,
    private readonly toastMessageService: ToastMessageService
  ) {}

  getStatusVisit() {
    return this.statusVisit.asObservable();
  }

  modalFinalizeVisit(data: VisitCloseInterface) {
    swalVisitActive
      .fire({
        title: 'ENCERRAR ATENDIMENTO?',
        html: `<span>Finalizar o atendimento para:</span>
               <h2>${data.nameVisitor}?</h2>`,
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
                this.statusVisit.next(true);
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
      title: 'ATENDIMENTO ATIVO',
      html: `<h2 class="mb-0">${name}</h2>
             <span>Secretaria: ${secretary.toUpperCase()}</span>
             </br>
             <span>Crachá: ${badge}</span>`,
    });
  }
}
