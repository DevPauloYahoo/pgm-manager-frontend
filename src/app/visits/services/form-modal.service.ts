import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  TypeVisitor,
  TypeVisitToVisitor,
} from '../../visitors/types/visitor.type';

@Injectable({
  providedIn: 'root',
})
export class FormModalService {
  showVisitModal = new EventEmitter<any>();
  visitorData: BehaviorSubject<TypeVisitor> = new BehaviorSubject<TypeVisitor>({
    visit: [],
    name: '',
    document: '',
    id: '',
  });

  @Output() saveNewVisit: EventEmitter<TypeVisitToVisitor> = new EventEmitter();

  setShowVisitModal() {
    this.showVisitModal.emit();
  }

  getShowVisitModal() {
    return this.showVisitModal.asObservable();
  }

  setVisitData(visit: TypeVisitor) {
    this.visitorData.next(visit);
  }

  getVisitData() {
    return this.visitorData.asObservable();
  }

  setSaveNewVisit(data: TypeVisitToVisitor) {
    this.saveNewVisit.emit(data);
  }

  getSaveNewVisit() {
    return this.saveNewVisit.asObservable();
  }
}
