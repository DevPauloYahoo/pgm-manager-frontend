import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import Swal from 'sweetalert2';

import { UserService } from '../../auth/services/user.service';
import { VisitCloseInterface } from '../../shared/models/shared.model';
import { VisitorsService } from '../../visitors/services/visitors.service';
import { VisitsService } from '../../visits/services/visits.service';
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
  @Output() statusVisit$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  @Output() updateVisitor$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private readonly visitService: VisitsService,
    private readonly visitorService: VisitorsService,
    private readonly userService: UserService,
    private readonly toastMessageService: ToastMessageService
  ) {}

  getStatusVisit() {
    return this.statusVisit$.asObservable();
  }

  getUpdateVisitorTable() {
    return this.updateVisitor$.asObservable();
  }

  modalFinalizeVisit(data: VisitCloseInterface) {
    swalVisitActive
      .fire({
        html: `
          <div class="card border-primary">
            <div class="d-flex">
              <div class="col-2 row">
                  <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
              </div>
              <div class="col-10 row">
                  <h2 class="text-primary my-auto">Procuradoria Geral do Município</h2>
              </div>

          </div>
          </div>
          <div class="card mt-3 bg-primary border-0 text-light" style="--bs-text-opacity: .9;">
            <div class="col-12 row p-2">
              <h3 class=" my-auto">SGA - ENCERRAR ATENDIMENTO</h3>
            </div>
          </div>
          <div class="card border-primary mt-3 pt-3">
            <div class="col-12 row">
              <span>Finalizar o atendimento para:</span>
              <h2 class="text-center">${data.nameVisitor}?</h2>
            </div>
          </div>
        `,

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
                this.statusVisit$.next(true);
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
      html: `
        <div class="card border-primary">
          <div class="d-flex">
            <div class="col-2 row">
                <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
            </div>
            <div class="col-10 row">
                <h2 class="text-primary my-auto">Procuradoria Geral do Município</h2>
            </div>

        </div>
        </div>
        <div class="card mt-3 bg-primary border-0 text-light" style="--bs-text-opacity: .9;">
          <div class="col-12 row p-2">
            <h3 class=" my-auto">SGA - ATENDIMENTO ATIVO</h3>
          </div>
        </div>
        <div class="card border-primary mt-3 p-3">
          <div class="col-12 row">
            <h2 class="text-center">${name}</h2>
            <span>Secretaria: ${secretary.toUpperCase()}</span>
            <br>
            <span>Crachá: ${badge}</span>
          </div>
        </div>
      `,
    });
  }

  modalTokenExpired(message: string) {
    swalVisitActive
      .fire({
        customClass: {
          confirmButton: 'btn btn-info',
        },
        html: `
        <div class="card border-info">
          <div class="d-flex">
            <div class="col-2 row">
                <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
            </div>
            <div class="col-10 row">
                <h2 class="text-info my-auto">>Procuradoria Geral do Município</h2>
            </div>

        </div>
        </div>
        <div class="card mt-3 bg-info border-0 text-dark" style="--bs-text-opacity: .9;">
          <div class="col-12 row p-2">
            <h3 class=" my-auto">SGA - SESSÃO EXPIROU</h3>
          </div>
        </div>
        <div class="card border-info mt-3 p-3">
          <div class="col-12 row">
            <h2 class="text-center">${message}</h2>
          </div>
        </div>
      `,
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
        html: `
          <div class="card border-primary">
            <div class="d-flex">
              <div class="col-2 row">
                  <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
              </div>
              <div class="col-10 row">
                  <h2 class="text-primary my-auto">Procuradoria Geral do Município</h2>
              </div>

          </div>
          </div>
          <div class="card mt-3 bg-danger border-0 text-light" style="--bs-text-opacity: .9;">
            <div class="col-12 row p-2">
              <h3 class=" my-auto">SGA - EXCLUIR VISITANTE</h3>
            </div>
          </div>
          <div class="card border-primary mt-3 pt-3">
            <div class="col-12 row">
              <span class="text-danger">ATENÇÃO! Ao excluir o visitante também serão excluídos
              todos os atendimentos a ele vinculados.</span>
              <span class="mt-2">Confirma a exclusão de:</span>
              <h2 class="text-center">${data.visitorName}?</h2>
            </div>
          </div>
        `,

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
                this.updateVisitor$.next(true);
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
      html: `
        <div class="card border-danger">
          <div class="d-flex">
            <div class="col-2 row">
                <img style="height: 50px; width: 70px;" src="assets/img/logo_2.png" alt="logo">
            </div>
            <div class="col-10 row">
                <h2 class="text-danger my-auto">Procuradoria Geral do Município</h2>
            </div>

        </div>
        </div>
        <div class="card mt-3 bg-danger border-0 text-light" style="--bs-text-opacity: .9;">
          <div class="col-12 row p-2">
            <h3 class=" my-auto">SGA - ERRO</h3>
          </div>
        </div>
        <div class="card border-danger mt-3 p-3">
          <div class="col-12 row">
            <h2 class="text-center mb-0">${message}.</h2>
            <span>Tente novamente.</span>
          </div>
        </div>
      `,
    });
  }
}
