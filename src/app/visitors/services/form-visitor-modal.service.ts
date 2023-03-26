import { EventEmitter, Injectable, Output } from '@angular/core';

import { TypeVisitor } from '../types/visitor.type';

@Injectable({
  providedIn: 'root',
})
export class FormVisitorModalService {
  showVisitorModal = new EventEmitter<any>();

  @Output() saveNewVisitor: EventEmitter<TypeVisitor> = new EventEmitter();

  setShowVisitorModal() {
    this.showVisitorModal.emit();
  }

  getShowVisitorModal() {
    return this.showVisitorModal.asObservable();
  }

  setSaveNewVisitor(data: TypeVisitor) {
    this.saveNewVisitor.emit(data);
  }

  getSaveNewVisitor() {
    return this.saveNewVisitor.asObservable();
  }
}
