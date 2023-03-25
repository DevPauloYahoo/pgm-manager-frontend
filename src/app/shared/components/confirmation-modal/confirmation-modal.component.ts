import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';

import { VisitCloseInterface } from '../../models/shared.model';
import { ModalService } from './modal.service';

declare let window: any;

@Component({
  selector: 'pgm-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {
  formModal: any;
  unsubscriptionModal$?: Subscription;
  unsubscriptionVisit$?: Subscription;

  visitClose: VisitCloseInterface = {
    id: '',
    nameVisitor: '',
  };

  @Input() titleModal = '';
  @Input() contentModal = '';
  @Output() closeVisit = new EventEmitter<string>();

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('confirmationModal')
    );

    this.unsubscriptionVisit$ = this.modalService.getVisitClose().subscribe({
      next: (visit: VisitCloseInterface) => {
        this.visitClose = visit;
      },
    });

    this.unsubscriptionModal$ = this.modalService
      .getShowModal()
      .pipe(tap(() => this.formModal.show()))
      .subscribe();
  }

  onCloseVisits() {
    // this.closeVisit.emit(this.visitClose.id);
    this.formModal.hide();
  }

  ngOnDestroy(): void {
    this.unsubscriptionModal$?.unsubscribe();
    this.unsubscriptionVisit$?.unsubscribe();
  }
}
