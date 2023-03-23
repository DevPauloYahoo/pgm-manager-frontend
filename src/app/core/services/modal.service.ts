import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalVisitActive(name: string, badge: string, secretary: string) {
    Swal.fire({
      icon: 'info',
      title: 'ATENDIMENTO ATIVO!',
      html: `<h2>${name}</h2>
             <span>Secretaria: ${secretary.toUpperCase()}</span>
             </br>
             <span>Crachá: ${badge}</span>`,
    }).then();
  }
}
