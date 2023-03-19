import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerLoadingService {
  private spinnerLoadingSubject = new BehaviorSubject<boolean>(false);
  spinnerLoading$ = this.spinnerLoadingSubject.asObservable();

  showLoading() {
    this.spinnerLoadingSubject.next(true);
  }

  hideLoading() {
    this.spinnerLoadingSubject.next(false);
  }
}
