import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { VisitCloseInterface } from '../../models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  showModal = new EventEmitter<any>();
  visitClose: Subject<VisitCloseInterface> = new Subject<VisitCloseInterface>();

  setVisitClose(visitClose: VisitCloseInterface) {
    this.visitClose.next(visitClose);
  }

  getVisitClose() {
    return this.visitClose.asObservable();
  }

  setShowModal() {
    this.showModal.emit();
  }

  getShowModal() {
    return this.showModal.asObservable();
  }
}
