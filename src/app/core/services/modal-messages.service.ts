import { EventEmitter, Injectable, Output } from '@angular/core';
import Swal from 'sweetalert2';

import { VisitCloseInterface } from '../../shared/models/shared.model';

const swalVisitActive = Swal.mixin({
  customClass: {
    image: 'mb-0 mt-2',
    htmlContainer: 'border border-success',
    title: 'mb-0 mt-0 text-success',
    confirmButton: 'btn btn-primary',
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
  @Output() visitFinalize = new EventEmitter<string>();

  modalFinalizeVisit(data: VisitCloseInterface) {
    swalVisitActive
      .fire({
        title: 'ENCERRAR ATENDIMENTO?',
        html: `<span>Finalizar o atendimento para:</span>
               <h2>${data.nameVisitor}</h2>?`,
        confirmButtonText: 'Finalizar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      })
      .then(resul => {
        if (resul.isConfirmed) {
          alert('Passou');
          this.visitFinalize.emit(data.id);
        }
      });
  }

  modalVisitActive(name: string, badge: string, secretary: string) {
    swalVisitActive
      .fire({
        title: 'ATENDIMENTO ATIVO!',
        html: `<h2>${name}</h2>
             <span>Secretaria: ${secretary.toUpperCase()}</span>
             </br>
             <span>Crachá: ${badge}</span>`,
      })
      .then();
  }
}
